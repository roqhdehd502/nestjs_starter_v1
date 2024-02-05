import { ApiProperty } from '@nestjs/swagger';

export class PostDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  author: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  likeCount: number;

  @ApiProperty()
  commentCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}

export class CreatePostDTO {
  @ApiProperty({ example: '홍길동' })
  author: string;

  @ApiProperty({ example: '제목' })
  title: string;

  @ApiProperty({ example: '내용' })
  content: string;
}
