import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import TokenPayload from '../interfaces/token_payload.interface';
import { UserVerification } from '../models/user_verification.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel(UserVerification.name)
    private readonly userVerificationModel: Model<UserVerification>,
  ) {}

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this._verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new BadRequestException('Bad request authentication', {
        cause: new Error(),
        description: '잘못된 인증 정보입니다.',
      });
    }
  }

  async getCookieWithJwtToken(userId: string) {
    try {
      const accessTokenPayload: TokenPayload = { userId };
      const refreshTokenPayload: TokenPayload = {
        userId,
        tokenType: 'refresh',
      };
      const accessToken = this.jwtService.sign(accessTokenPayload);
      const refreshToken = this.jwtService.sign(refreshTokenPayload);

      const updateUserVerication =
        await this.userVerificationModel.findOneAndUpdate(
          { user: userId },
          { code: refreshToken, status: 'ok', updatedAt: Date.now() },
          { new: true },
        );
      if (!updateUserVerication) {
        await this.userVerificationModel.create({
          user: userId,
          code: refreshToken,
          status: 'ok',
        });
      }

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      throw new BadRequestException('Bad request authentication', {
        cause: new Error(),
        description: '잘못된 인증 정보입니다',
      });
    }
  }

  private async _verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Bad request authentication', {
        cause: new Error(),
        description: '잘못된 인증 정보입니다.',
      });
    }
  }
}
