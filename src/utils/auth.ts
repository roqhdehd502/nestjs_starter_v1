import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  JWT_EXPIRATION_TIME,
  JWT_REFRESH_EXPIRATION_TIME,
  JWT_SECRET,
} from '~/common/constants';
import { GetUserDto } from '~/modules/user/dto/user.response.dto';

const DEFAULT_SALT_ROUNDS = 10;

/**
 * 비밀번호 해싱
 */
export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, DEFAULT_SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

/**
 * 비밀번호를 비교하여 일치 여부 확인
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    if (match) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

// * access token / refresh token 일괄 생성
export const createJwt = async (user: GetUserDto) => {
  try {
    const jwtService = new JwtService();

    // * Access Token, Refresh Token 생성
    const accessTokenPayload: JwtPayload = {
      user,
    };
    const refreshTokenPayload: JwtPayload = {
      user,
      tokenType: 'refresh',
    };
    const accessToken = jwtService.sign(accessTokenPayload, {
      algorithm: 'HS256',
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRATION_TIME,
    });
    const refreshToken = jwtService.sign(refreshTokenPayload, {
      algorithm: 'HS256',
      secret: JWT_SECRET,
      expiresIn: JWT_REFRESH_EXPIRATION_TIME,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};
