import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
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
