import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PostPostDto {
  @ApiProperty({
    type: 'string',
    description: '제목',
    example: '제목',
  })
  @IsString({ message: '제목은 문자열로 입력해야 합니다' })
  readonly title: string;

  @ApiProperty({
    type: 'string',
    description: '내용',
    example: '내용',
  })
  @IsString({ message: '내용은 문자열로 입력해야 합니다' })
  readonly content: string;
}