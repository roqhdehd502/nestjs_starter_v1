import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

// * 게시글 작성 DTO
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

// * 게시글 수정 DTO
export class PutPostDto extends PostPostDto {
  @ApiProperty({
    type: 'string',
    description: '고유 id',
    example: '고유 id',
  })
  @IsString({ message: '고유 id는 문자열로 입력해야 합니다' })
  readonly id: string;
}