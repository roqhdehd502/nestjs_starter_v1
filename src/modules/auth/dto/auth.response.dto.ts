import { ApiProperty } from '@nestjs/swagger';

// * 유저 조회 DTO
export class GetJwtDto {
  @ApiProperty({
    type: 'string',
    description: '액세스 토큰',
    example: '액세스 토큰',
  })
  readonly accessToken: string;

  @ApiProperty({
    type: 'string',
    description: '리프레시 토큰',
    example: '리프레시 토큰',
  })
  readonly refreshToken: string;
}
