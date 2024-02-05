import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/post')
  @ApiOperation({ summary: '게시글', description: '게시글 불러오기' })
  @ApiResponse({ status: 200, description: '성공시 데이터 불러오기' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  getPost() {
    return 'Post Page';
  }
}
