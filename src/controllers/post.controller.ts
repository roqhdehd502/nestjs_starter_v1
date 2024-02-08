import {
  Controller,
  Get,
  Post,
  NotFoundException,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PostPostDTO } from '../models/post.model';
import { PostService } from '../services/post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @Get()
  // @ApiOperation({ summary: '게시글 목록', description: '게시글 목록 불러오기' })
  // @ApiResponse({ status: 200, description: '성공' })
  // @ApiResponse({ status: 500, description: '내부 에러' })
  // async getPostList() {
  //   return await this.postService.getPostList();
  // }

  // @Get(':id')
  // @ApiOperation({ summary: '게시글 상세', description: '게시글 상세 불러오기' })
  // @ApiResponse({ status: 200, description: '성공' })
  // @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  // @ApiResponse({ status: 500, description: '내부 에러' })
  // getPost(@Param('id') id: string) {
  //   const post = posts.find((post) => post.id === +id);
  //   if (!post) {
  //     throw new NotFoundException('Not found post', {
  //       cause: new Error(),
  //       description: '게시글 정보를 찾을 수 없습니다',
  //     });
  //   }

  //   return {
  //     author: post.author,
  //     title: post.title,
  //     content: post.content,
  //     createdAt: post.createdAt.toString(),
  //     updatedAt: post.createdAt ? post.createdAt.toString() : '',
  //   };
  // }

  // @Post()
  // @ApiOperation({ summary: '게시글 생성', description: '게시글 생성하기' })
  // @ApiResponse({ status: 200, description: '성공' })
  // @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  // @ApiResponse({ status: 500, description: '내부 에러' })
  // @ApiBody({
  //   type: CreatePostDTO,
  //   description: '게시글 생성에 필요한 데이터',
  // })
  // postPost(
  //   @Body('author') author: string,
  //   @Body('title') title: string,
  //   @Body('content') content: string,
  // ) {
  //   const post: PostDTO = {
  //     author: author,
  //     title: title,
  //     content: content,
  //     createdAt: new Date(),
  //   };

  //   // NOTE: 임시
  //   posts = [...posts, post];

  //   return {
  //     status: 'ok',
  //   };
  // }
}
