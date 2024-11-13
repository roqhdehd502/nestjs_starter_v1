import { ApiProperty } from '@nestjs/swagger';

// * 유저 조회 DTO
export class GetUserDto {
  @ApiProperty({
    type: 'string',
    description: '고유 id',
    example: '고유 id',
  })
  readonly id: string;

  @ApiProperty({
    type: 'string',
    description: '이메일',
    example: '이메일',
  })
  readonly email: string;

  @ApiProperty({
    type: 'string',
    description: '생성일',
    example: '생성일',
  })
  readonly createdAt: string;

  @ApiProperty({
    type: 'string',
    description: '수정일',
    example: '수정일',
    required: false,
  })
  readonly updatedAt?: string;
}
