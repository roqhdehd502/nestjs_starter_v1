import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { EmailType } from '~/common/constants';
import { sendEmail } from '~/lib/nodemailer/node-mailer.server';
import { UserHashModel, UserModel } from '~/models';
import { comparePassword, createJwt, hashPassword } from '~/utils/auth';
import { formatDate } from '~/utils/date';
import { createRandomString } from '~/utils/generate';

import { GetCommonOkDto } from '../app/dto/app.response.dto';
import { AuthService } from '../auth/auth.service';
import { GetJwtDto } from '../auth/dto/auth.response.dto';
import { LogService } from '../log/log.service';
import {
  ChangePasswordDto,
  RegisterDto,
  RemoveUserDto,
  ResetPasswordDto,
} from './dto/user.request.dto';
import { GetUserDto } from './dto/user.response.dto';
import { starter } from '~/lib/mongodb/mongodb.server';
import { User } from '~/models/user';
import { UserHash } from '~/models/user-hash';

@Injectable()
export class UserService {
  // private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly logService: LogService,
    private readonly authService: AuthService,
  ) {}

  // * 회원가입
  async register(request: Request, body: RegisterDto): Promise<GetJwtDto> {
    const LOG_CODE = 'create-user';

    const session = await starter.startSession();
    session.startTransaction();

    const { email, password } = body;

    try {
      // * 기존에 가입했는지 확인
      const isExistUser = await UserModel.exists({ email });
      if (isExistUser) {
        throw new ConflictException('사용 중인 메일 주소입니다', {
          cause: new Error(),
          description: 'Already user',
        });
      }

      // * 유저 정보 생성
      const user = new UserModel({
        email,
      });
      await user.save({ session });

      // * 유저 해시 생성
      const hash = await hashPassword(password.toString());
      const newUserHash = new UserHashModel({
        user: user._id,
        hash,
      });
      await newUserHash.save({ session });

      // * 회원가입 성공시 로그인 처리
      const getUserDto: GetUserDto = {
        id: user._id.toString(),
        email: user.email,
        createdAt: formatDate(user.createdAt),
        updatedAt: formatDate(user.updatedAt),
      };

      // * Access Token, Refresh Token 생성
      const { accessToken, refreshToken } = await createJwt(getUserDto);

      this.logService.createLog({
        request,
        code: LOG_CODE,
        message: 'create user.',
      });

      // * 트랜잭션 커밋
      await session.commitTransaction();

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      // * 트랜잭션 롤백
      await session.abortTransaction();

      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong create user.',
      });

      throw error;
    } finally {
      // * 세션 종료
      session.endSession();
    }
  }

  // * 비밀번호 초기화
  async resetPassword(
    request: Request,
    body: ResetPasswordDto,
  ): Promise<GetCommonOkDto> {
    const LOG_CODE = 'reset-password';

    const { email } = body;

    try {
      // * 가입된 이메일인지 확인
      const user = await UserModel.findOne<User>({
        email,
      });
      if (!user) {
        throw new NotFoundException('유저를 찾을 수 없습니다', {
          cause: new Error(),
          description: 'Not found user',
        });
      }

      // * 기존 비밀번호 검증
      const hashedPassword = await UserHashModel.findOne<UserHash>({
        user: user._id,
      });
      if (!hashedPassword) {
        throw new NotFoundException('유저를 찾을 수 없습니다', {
          cause: new Error(),
          description: 'Not found user',
        });
      }

      // * 임의의 비밀번호 생성
      const newPassword = createRandomString(12, true);

      // * 비밀번호 초기화 이메일 발송
      await sendEmail({
        to: email,
        code: newPassword,
        type: EmailType.RESET_PASSWORD,
      });

      // * 비밀번호 해시화
      const encrypted = await hashPassword(newPassword.toString());

      // * 비밀번호 업데이트
      hashedPassword.hash = encrypted;
      hashedPassword.updatedAt = new Date();
      await hashedPassword.save();

      this.logService.createLog({
        request,
        code: LOG_CODE,
        message: 'change password.',
      });

      return {
        status: 'ok',
      };
    } catch (error) {
      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong change password.',
      });

      throw error;
    }
  }

  // * 비밀번호 변경
  async changePassword(
    request: Request,
    body: ChangePasswordDto,
  ): Promise<GetCommonOkDto> {
    const LOG_CODE = 'change-password';

    const { email, currentPassword, newPassword } = body;

    try {
      // * 가입된 이메일인지 확인
      const user = await UserModel.findOne<User>({
        email,
      });
      if (!user) {
        throw new NotFoundException('유저를 찾을 수 없습니다', {
          cause: new Error(),
          description: 'Not found user',
        });
      }

      // * 기존 비밀번호 검증
      const hashedPassword = await UserHashModel.findOne<UserHash>({
        user: user._id,
      });
      if (!hashedPassword) {
        throw new NotFoundException('유저를 찾을 수 없습니다', {
          cause: new Error(),
          description: 'Not found user',
        });
      }

      const isPasswordValid = await comparePassword(
        currentPassword.toString(),
        hashedPassword.hash,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('현재 비밀번호가 올바르지 않습니다', {
          cause: new Error(),
          description: 'Invalid current password',
        });
      }

      // * 기존 비밀번호와 변경할 비밀번호가 다른지 확인
      if (currentPassword.toString() == newPassword.toString()) {
        throw new BadRequestException(
          '새 비밀번호는 기존 비밀번호와 달라야합니다',
          {
            cause: new Error(),
            description: 'New password cannot be the same as current password',
          },
        );
      }

      // * 비밀번호 해시화
      const encrypted = await hashPassword(newPassword.toString());

      // * 비밀번호 업데이트
      hashedPassword.hash = encrypted;
      hashedPassword.updatedAt = new Date();
      await hashedPassword.save();

      this.logService.createLog({
        request,
        code: LOG_CODE,
        message: 'change password.',
      });

      return {
        status: 'ok',
      };
    } catch (error) {
      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong change password.',
      });

      throw error;
    }
  }

  // * 회원탈퇴
  async removeUser(
    request: Request,
    body: RemoveUserDto,
  ): Promise<GetCommonOkDto> {
    const LOG_CODE = 'remove-user';

    const { password } = body;

    try {
      // * 유저 정보 조회
      const user = await this.authService.getUserAsToken(request);

      // * 기존 비밀번호 검증
      const hashedPassword = await UserHashModel.findOne<UserHash>({
        user: user.id,
      });
      if (!hashedPassword) {
        throw new NotFoundException('유저를 찾을 수 없습니다', {
          cause: new Error(),
          description: 'Not found user',
        });
      }

      const isPasswordValid = await comparePassword(
        password.toString(),
        hashedPassword.hash,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('현재 비밀번호가 올바르지 않습니다', {
          cause: new Error(),
          description: 'Invalid current password',
        });
      }

      // * 유저 정보 삭제
      const userDetail = await UserModel.findOne<User>({
        _id: user.id,
      });
      userDetail.isDelete = true;
      await userDetail.save();

      this.logService.createLog({
        request,
        code: LOG_CODE,
        message: 'change password.',
      });

      return {
        status: 'ok',
      };
    } catch (error) {
      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong change password.',
      });

      throw error;
    }
  }
}
