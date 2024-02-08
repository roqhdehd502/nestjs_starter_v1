import {
  Body,
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
import { User, UserPostDTO } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authSerive: AuthService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: '인증확인',
    description: 'JWT 인증 토큰 검증 후 로그인 된 유저정보 가져오기',
  })
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @Post()
  @ApiOperation({ summary: '유저 회원가입', description: '유저 회원가입하기' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 401, description: '인증 에러' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  @ApiBody({
    type: UserPostDTO,
    description: '유저 회원가입에 필요한 데이터',
  })
  async register(@Body() userPostDTO: UserPostDTO) {
    return this.authSerive.register(userPostDTO);
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(AuthenticationGuard)
  @ApiOperation({
    summary: '유저 로그인',
    description: '유저 로그인 후 JWT 발급',
  })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 401, description: '인증 에러' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  @ApiBody({
    type: User,
    description: '유저 로그인에 필요한 데이터',
  })
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authSerive.getCookieWithJwtToken(user._id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;

    return response.send(user);
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: '유저 로그아웃',
    description: '유저 로그아웃 후 JWT 제거',
  })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 401, description: '인증 에러' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async logout(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authSerive.getCookieForLogOut());

    return response.sendStatus(200);
  }
}
