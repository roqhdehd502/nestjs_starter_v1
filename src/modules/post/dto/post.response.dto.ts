import { ApiProperty } from "@nestjs/swagger";

// * 게시글 조회 DTO
export class GetPostDto {
  @ApiProperty({
    type: 'string',
    description: '고유 id',
    example: '고유 id',
  })
  readonly id: string;

  @ApiProperty({
    type: 'string',
    description: '제목',
    example: '제목',
  })
  readonly title: string;

  @ApiProperty({
    type: 'string',
    description: '내용',
    example: '내용',
  })
  readonly content: string;

  @ApiProperty({
    type: 'string',
    description: '작성자 명',
    example: '작성자 명',
  })
  readonly author: string;

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
  })
  readonly updatedAt: string;
}

// * 게시글 목록 조회 DTO
export class GetPostListDto {
  @ApiProperty({
    type: 'number',
    description: '총 레코드 수',
    example: 30,
  })
  readonly totalCount: number;

  @ApiProperty({
    type: 'number',
    description: '현재 페이지',
    example: 1,
  })
  readonly page: number;

  @ApiProperty({
    type: 'number',
    description: '페이지당 레코드 수',
    example: 10,
  })
  readonly limit: number;

  @ApiProperty({
    type: [GetPostDto],
    description: '목록',
    example: [
      {
        id: '고유 id',
        title: '제목',
        content: '내용',
        author: '작성자 명',
        createdAt: '생성일',
        updatedAt: '수정일',
      },
    ],
  })
  readonly resultList: GetPostDto[];
}