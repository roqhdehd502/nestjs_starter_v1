import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetCommonOkDto } from '../app/dto/app.response.dto';
import { AuthService } from '../auth/auth.service';
import { LoginDTO } from '../auth/dto/auth.request.dto';
import { GetJwtDto } from '../auth/dto/auth.response.dto';
import {
  ChangePasswordDto,
  RegisterDto,
  RemoveUserDto,
  ResetPasswordDto,
} from './dto/user.request.dto';
import { GetUserDto } from './dto/user.response.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // * 회원가입
  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: '회원가입',
    description: '회원 가입 완료 후 JWT 발급',
  })
  @ApiBody({
    type: RegisterDto,
    description: '회원가입에 필요한 데이터',
  })
  @ApiResponse({ status: 200, description: '성공', type: GetJwtDto })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 409, description: '이미 존재함' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async register(@Req() request: Request, @Body() body: RegisterDto) {
    return await this.userService.register(request, body);
  }

  // * 유저 정보 상세
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '유저 정보 상세',
    description:
      '조회하고자 하는 유저정보 상세 불러오기. (테스트 시 우측 상단 Authorize 버튼에서 access token 입력한 다음 검증 후 진행)',
  })
  @ApiHeader({ name: 'Refresh', description: '리프레시 토큰', required: true })
  @ApiHeader({
    name: 'Authorization',
    description: '액세스 토큰 (Bearer)',
    required: true,
  })
  @ApiResponse({ status: 200, description: '성공', type: GetUserDto })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 401, description: '인증 에러' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async getUser(@Req() request: Request) {
    return this.authService.getUserAsToken(request);
  }

  // * 로그인
  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: '로그인',
    description: '인증 완료 후 JWT 발급으로 로그인 처리',
  })
  @ApiBody({
    type: LoginDTO,
    description: '인증에 필요한 데이터',
  })
  @ApiResponse({ status: 200, description: '성공', type: GetJwtDto })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 401, description: '인증 에러' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async login(@Req() request: Request, @Body() body: LoginDTO) {
    return this.authService.createAccessWithRefreshToken(request, body);
  }

  // * JWT 재발급
  @Put('refresh')
  @HttpCode(200)
  @ApiOperation({
    summary: 'JWT 재발급',
    description:
      'JWT 재발급으로 로그인 유지. (테스트 시 우측 상단 Authorize 버튼에서 access token 입력한 다음 검증 후 진행)',
  })
  @ApiHeader({ name: 'Refresh', description: '리프레시 토큰', required: true })
  @ApiResponse({ status: 200, description: '성공', type: GetJwtDto })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 401, description: '인증 에러' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async refresh(@Req() request: Request) {
    return this.authService.updateAccessWithRefreshToken(request);
  }

  // * 비밀번호 초기화 이메일 발송
  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({
    summary: '비밀번호 초기화 이메일 발송',
    description: '비밀번호 초기화 이메일 발송',
  })
  @ApiBody({
    type: ResetPasswordDto,
    description: '비밀번호 초기화에 필요한 데이터',
  })
  @ApiResponse({ status: 200, description: '성공', type: GetCommonOkDto })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 401, description: '인증 에러' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async resetPassword(@Req() request: Request, @Body() body: ResetPasswordDto) {
    return await this.userService.resetPassword(request, body);
  }

  // * 비밀번호 변경
  @Put('change-password')
  @HttpCode(200)
  @ApiOperation({
    summary: '비밀번호 변경',
    description: '비밀번호 변경',
  })
  @ApiBody({
    type: ChangePasswordDto,
    description: '비밀번호 변경에 필요한 데이터',
  })
  @ApiResponse({ status: 200, description: '성공', type: GetCommonOkDto })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 401, description: '인증 에러' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async changePassword(
    @Req() request: Request,
    @Body() body: ChangePasswordDto,
  ) {
    return await this.userService.changePassword(request, body);
  }

  // * 회원탈퇴
  @Post('remove')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '회원탈퇴',
    description: '회원탈퇴',
  })
  @ApiHeader({ name: 'Refresh', description: '리프레시 토큰', required: true })
  @ApiHeader({
    name: 'Authorization',
    description: '액세스 토큰 (Bearer)',
    required: true,
  })
  @ApiBody({
    type: RemoveUserDto,
    description: '회원탈퇴에 필요한 데이터',
  })
  @ApiResponse({ status: 200, description: '성공', type: GetCommonOkDto })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 401, description: '인증 에러' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async removeUser(@Req() request: Request, @Body() body: RemoveUserDto) {
    return await this.userService.removeUser(request, body);
  }
}
