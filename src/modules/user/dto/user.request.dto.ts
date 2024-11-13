import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

// * 회원가입 DTO
export class RegisterDto {
  @ApiProperty({
    type: 'string',
    description: '이메일',
    example: 'abcd1234@gmail.com',
  })
  @IsString({ message: '이메일은 문자열로 입력해야 합니다' })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다' })
  readonly email: string;

  @ApiProperty({
    type: 'string',
    description: '비밀번호',
    example: '비밀번호',
  })
  @IsString({ message: '비밀번호는 문자열로 입력해야 합니다' })
  readonly password: string;
}

// * 비밀번호 초기화 DTO
export class ResetPasswordDto {
  @ApiProperty({
    type: 'string',
    description: '이메일',
    example: 'abcd1234@gmail.com',
  })
  @IsString({ message: '이메일은 문자열로 입력해야 합니다' })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다' })
  readonly email: string;
}

// * 비밀번호 변경 DTO
export class ChangePasswordDto {
  @ApiProperty({
    type: 'string',
    description: '이메일',
    example: 'abcd1234@gmail.com',
  })
  @IsString({ message: '이메일은 문자열로 입력해야 합니다' })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다' })
  readonly email: string;

  @ApiProperty({
    type: 'string',
    description: '기존 비밀번호',
    example: '기존 비밀번호',
  })
  @IsString({ message: '비밀번호는 문자열로 입력해야 합니다' })
  readonly currentPassword: string;

  @ApiProperty({
    type: 'string',
    description: '변경할 비밀번호',
    example: '변경할 비밀번호',
  })
  @IsString({ message: '비밀번호는 문자열로 입력해야 합니다' })
  readonly newPassword: string;
}

// * 회원탈퇴 DTO
export class RemoveUserDto {
  @ApiProperty({
    type: 'string',
    description: '비밀번호',
    example: '비밀번호',
  })
  @IsString({ message: '비밀번호는 문자열로 입력해야 합니다' })
  readonly password: string;
}
