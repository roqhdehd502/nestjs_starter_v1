import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import JwtGuard from '../guards/jwt.guard';
import RequestWithUser from '../interfaces/request_with_user.interface';
import { PostWithPutPostDTO } from '../models/post.model';
import { PostService } from '../services/post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: '게시글 목록', description: '게시글 목록 불러오기' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async getPostList() {
    return await this.postService.getPostList();
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세', description: '게시글 상세 불러오기' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async getPost(@Param('id') id: string) {
    return await this.postService.getPost(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 생성', description: '게시글 생성하기' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  @ApiBody({
    type: PostWithPutPostDTO,
    description: '게시글 생성에 필요한 데이터',
  })
  async postPost(
    @Req() request: RequestWithUser,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const body: PostWithPutPostDTO = {
      title: title,
      content: content,
    };
    await this.postService.postPost(request.user, body);

    return {
      status: 'ok',
    };
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 수정', description: '게시글 수정하기' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  @ApiBody({
    type: PostWithPutPostDTO,
    description: '게시글 생성에 필요한 데이터',
  })
  async putPost(
    @Param('id') id: string,
    @Req() request: RequestWithUser,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const body: PostWithPutPostDTO = {
      title: title,
      content: content,
    };
    await this.postService.putPost(request.user, body, id);

    return {
      status: 'ok',
    };
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 삭제', description: '게시글 삭제하기' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async deletePost(@Param('id') id: string, @Req() request: RequestWithUser) {
    await this.postService.deletePost(request.user, id);

    return {
      status: 'ok',
    };
  }
}
