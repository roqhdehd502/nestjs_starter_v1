import {
  Body,
  Controller,
  Post,
  Req,
  HttpCode,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { GetCommonOkDto } from '../app/dto/app.response.dto';
import { PostPostDto, PutPostDto } from './dto/post.request.dto';
import { CommonSort } from '~/common/constants';
import { GetPostDto, GetPostListDto } from './dto/post.response.dto';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // * 게시글 작성
  @Post()
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '게시글 작성',
    description: '게시글 작성하기'
  })
  @ApiHeader({ name: 'Refresh', description: '리프레시 토큰', required: true })
  @ApiHeader({
    name: 'Authorization',
    description: '액세스 토큰 (Bearer)',
    required: true,
  })
  @ApiBody({
    type: PostPostDto,
    description: '게시글 생성에 필요한 데이터',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetCommonOkDto,
  })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async postPost(
    @Req() request: Request,
    @Body() body: PostPostDto,
  ) {
    return await this.postService.postPost(request, body);
  }

  // * 게시글 수정
  @Put()
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '게시글 수정',
    description: '게시글 수정하기'
  })
  @ApiHeader({ name: 'Refresh', description: '리프레시 토큰', required: true })
  @ApiHeader({
    name: 'Authorization',
    description: '액세스 토큰 (Bearer)',
    required: true,
  })
  @ApiBody({
    type: PutPostDto,
    description: '게시글 수정에 필요한 데이터',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetCommonOkDto,
  })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async putPost(
    @Req() request: Request,
    @Body() body: PutPostDto,
  ) {
    return await this.postService.putPost(request, body);
  }

  // * 게시글 목록
  @Get()
  @ApiOperation({
    summary: '게시글 목록',
    description: '게시글 목록 불러오기',
  })
  @ApiQuery({
    name: 'sort',
    description: '정렬방식 (기본 desc)',
    enum: CommonSort,
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: '한 페이지 내 불러올 목록 수 (기본 10)',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: '불러올 페이지 넘버 (기본 1)',
    type: Number,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetPostListDto,
  })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async getPostList(
    @Req() request: Request,
    @Query('sort') sort: CommonSort = CommonSort.DESC,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  ) {
    return await this.postService.getPostList(request, {
      sort,
      limit,
      page,
    });
  }

  // * 게시글 상세
  @Get(':id')
  @ApiOperation({
    summary: '게시글 상세',
    description: '게시글 상세 불러오기',
  })
  @ApiParam({
    name: 'id',
    description: '고유 id',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetPostDto,
  })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async getPost(
    @Req() request: Request,
    @Param('id') id: string,
  ) {
    return await this.postService.getPost(request, {
      id
    });
  }

  // * 게시글 삭제
  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '게시글 삭제',
    description: '게시글 삭제하기'
  })
  @ApiHeader({ name: 'Refresh', description: '리프레시 토큰', required: true })
  @ApiHeader({
    name: 'Authorization',
    description: '액세스 토큰 (Bearer)',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: '고유 id',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetCommonOkDto,
  })
  @ApiResponse({ status: 400, description: '요청상태가 올바르지 않음' })
  @ApiResponse({ status: 404, description: '데이터를 찾을 수 없음' })
  @ApiResponse({ status: 409, description: '이미 존재함' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async deletePost(
    @Req() request: Request,
    @Param('id') id: string,
  ) {
    return await this.postService.deletePost(request, {
      id
    });
  }
}
