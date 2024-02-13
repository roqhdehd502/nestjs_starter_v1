import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthenticationGuard } from '../guards/auth.guard';
import JwtGuard from '../guards/jwt.guard';
import RequestWithUser from '../interfaces/request_with_user.interface';
import { AuthLoginDTO } from '../models/user_verification.model';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authSerive: AuthService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: '인증 및 유저정보 가져오기',
    description: 'JWT 인증 토큰 검증 후 로그인 된 유저정보 가져오기',
  })
  authenticate(@Req() request: RequestWithUser) {
    try {
      const { _id, email, name, createdAt, updatedAt } = request.user;
      return {
        _id: _id,
        email: email,
        name: name,
        createdAt: createdAt,
        updatedAt: updatedAt ?? '',
      };
    } catch (error) {
      throw new BadRequestException('Bad request authentication', {
        cause: new Error(),
        description: '잘못된 인증 정보입니다.',
      });
    }
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(AuthenticationGuard)
  @ApiOperation({
    summary: '유저 로그인',
    description: '유저 로그인 후 JWT 발급 및 인증 header 설정',
  })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 401, description: '인증 에러' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  @ApiBody({
    type: AuthLoginDTO,
    description: '유저 로그인에 필요한 데이터',
  })
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const { accessToken, refreshToken } =
      await this.authSerive.getCookieWithJwtToken(user._id);

    return response.send({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
}
