import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from '../services/app.service';

@ApiTags('test')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: '게시글 목록', description: '게시글 목록 불러오기' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async getPostList() {
    return [
      {
        id: 12,
        title: 'title',
      },
    ];
  }
}
