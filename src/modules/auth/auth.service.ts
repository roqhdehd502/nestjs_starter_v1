import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

import {
  BASE_API_KEY,
  BASE_SECRET_KEY,
  HEADER_API_KEY,
  HEADER_AUTHORIZATION,
  HEADER_REFRESH,
  HEADER_SECRET_KEY,
  JWT_SECRET,
} from '~/common/constants';
import { UserHashModel, UserModel } from '~/models';
import { comparePassword, createJwt } from '~/utils/auth';
import { localizedFormatDate } from '~/utils/date';

import { LogService } from '../log/log.service';
import { GetUserDto } from '../user/dto/user.response.dto';
import { LoginDTO } from './dto/auth.request.dto';
import { GetJwtDto } from './dto/auth.response.dto';
import { User } from '~/models/user';
import { starter } from '~/lib/mongodb/mongodb.server';
import { UserHash } from '~/models/user-hash';

@Injectable()
export class AuthService {
  // private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly logService: LogService,
  ) {}

  // * 유저 정보 가져오기
  async getUser(email: string): Promise<GetUserDto> {
    try {
      // * 유저 정보 조회
      const user = await UserModel.findOne<User>({ email });

      if (!user) {
        throw new NotFoundException('유저 정보를 찾을 수 없습니다', {
          cause: new Error(),
          description: 'Not found user',
        });
      }

      if (user.isDelete) {
        throw new NotFoundException('탈퇴된 유저입니다', {
          cause: new Error(),
          description: 'Deleted user',
        });
      }

      return {
        id: user._id.toString(),
        email: user.email,
        createdAt: localizedFormatDate(user.createdAt),
        updatedAt: localizedFormatDate(user.updatedAt),
      };
    } catch (error) {
      throw error;
    }
  }

  // * 액세스 토큰 및 리프레시 토큰 생성
  async createAccessWithRefreshToken(
    request: Request,
    body: LoginDTO,
  ): Promise<GetJwtDto> {
    const LOG_CODE = 'create-jwt';

    const session = await starter.startSession();
    session.startTransaction();

    const { email, password } = body;

    try {
      // * 유저 정보 조회
      const user = await this.getUser(email);

      // * 유저 해시 조회
      const userHash = await UserHashModel.findOne<UserHash>({
        user: user.id,
      });
      if (!userHash) {
        throw new UnauthorizedException('인증에 실패하였습니다', {
          cause: new Error(),
          description: 'Unauthorized authentication',
        });
      }

      // * 비밀번호 검증
      const validatePassword = await comparePassword(password, userHash.hash);
      if (!validatePassword) {
        throw new UnauthorizedException('인증에 실패하였습니다', {
          cause: new Error(),
          description: 'Unauthorized authentication',
        });
      }

      // * Access Token, Refresh Token 생성
      const { accessToken, refreshToken } = await createJwt(user);

      this.logService.createLog({
        request,
        code: LOG_CODE,
        message: 'create auth.',
      });

      // * 트랜잭션 커밋
      await session.commitTransaction();
      session.endSession();

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      // * 트랜잭션 롤백
      await session.abortTransaction();
      session.endSession();

      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong create auth.',
      });

      throw error;
    }
  }

  // * JWT 기반 유저 정보 가져오기
  async getUserAsToken(request: Request): Promise<GetUserDto> {
    const LOG_CODE = 'get-user-info';

    try {
      // * 액세스 토큰 가져오기
      const authorizationHeader = request.headers[HEADER_AUTHORIZATION];
      if (!authorizationHeader) {
        throw new UnauthorizedException('인증되지 않은 토큰입니다', {
          cause: new Error(),
          description: 'Missing authorization header',
        });
      }

      const accessToken = authorizationHeader.replace('Bearer ', '');

      // * 리프레시 토큰 가져오기
      const refreshToken = request.headers[HEADER_REFRESH] as string;
      if (!refreshToken) {
        throw new UnauthorizedException('인증되지 않은 토큰입니다', {
          cause: new Error(),
          description: 'Missing refresh token header',
        });
      }

      // * 액세스 토큰 디코딩
      const decodedAccessToken = this.jwtService.verify<JwtPayload>(
        accessToken,
        { secret: JWT_SECRET },
      );
      if (!decodedAccessToken) {
        throw new UnauthorizedException('인증되지 않은 토큰입니다', {
          cause: new Error(),
          description: 'Unauthorized authentication',
        });
      }

      // * 리프레시 토큰 디코딩
      const decodedRefreshToken = this.jwtService.verify<JwtPayload>(
        refreshToken,
        { secret: JWT_SECRET },
      );
      if (!decodedRefreshToken) {
        throw new UnauthorizedException('인증되지 않은 토큰입니다', {
          cause: new Error(),
          description: 'Unauthorized authentication',
        });
      }

      // * 유저 정보 조회
      const user = await UserModel.findById<User>(decodedAccessToken.user.id);
      if (!user) {
        throw new NotFoundException('유저 정보를 찾을 수 없습니다', {
          cause: new Error(),
          description: 'Not found user',
        });
      }

      return {
        id: user._id.toString(),
        email: user.email,
        createdAt: localizedFormatDate(user.createdAt),
        updatedAt: localizedFormatDate(user.updatedAt),
      };
    } catch (error) {
      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong read auth.',
      });

      // * 토큰 만료 예외처리
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('토큰이 만료되었습니다', {
          cause: error,
          description: 'Expired jwt',
        });
      }

      throw error;
    }
  }

  // * 액세스 토큰 및 리프레시 토큰 재발급
  async updateAccessWithRefreshToken(request: Request): Promise<GetJwtDto> {
    const LOG_CODE = 're-create-jwt';

    const refreshToken = request.headers[HEADER_REFRESH] as string;

    try {
      const decodedRefreshToken = await this.jwtService.verify<JwtPayload>(
        refreshToken,
        { secret: JWT_SECRET },
      );
      if (!decodedRefreshToken) {
        throw new UnauthorizedException('인증에 실패하였습니다', {
          cause: new Error(),
          description: 'Unauthorized authentication',
        });
      }

      const user = await this.getUser(decodedRefreshToken.user.email);

      // 재발급 할 Access Token, Refresh Token 생성
      const newToken = await createJwt(user);

      this.logService.createLog({
        request,
        code: LOG_CODE,
        message: 'update auth.',
      });

      return {
        accessToken: newToken.accessToken,
        refreshToken: newToken.refreshToken,
      };
    } catch (error) {
      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong update auth.',
      });
      throw error;
    }
  }

  // * api 키 및 시크릿 키 검증
  async getValidBaseApikeyWithSecretkey(request: Request): Promise<boolean> {
    const LOG_CODE = 'get-valid-base-apikey-with-secretkey';

    try {
      // * api 키 가져오기
      const apikey = request.headers[HEADER_API_KEY] as string;
      if (!apikey) {
        throw new UnauthorizedException('API키가 올바르지 않습니다', {
          cause: new Error(),
          description: 'Missing api key header',
        });
      }

      // * 시크릿 키 가져오기
      const secretkey = request.headers[HEADER_SECRET_KEY] as string;
      if (!secretkey) {
        throw new UnauthorizedException('시크릿키가 올바르지 않습니다', {
          cause: new Error(),
          description: 'Missing secret key header',
        });
      }

      if (apikey !== BASE_API_KEY || secretkey !== BASE_SECRET_KEY) {
        throw new UnauthorizedException(
          '인증되지 않은 API키이거나 시크릿키 입니다',
          {
            cause: new Error(),
            description: 'Unauthorized api key or secret key',
          },
        );
      }

      return true;
    } catch (error) {
      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong read valid base apikey with base secretkey.',
      });
      throw error;
    }
  }
}
