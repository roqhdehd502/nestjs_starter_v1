import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCommonOkDto } from './dto/app.response.dto';
import { AppService } from './app.service';

@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // * 헬스 체크
  @Get('health')
  @HttpCode(200)
  @ApiOperation({
    summary: '[서버에서만 사용] 헬스 체크',
    description: '서버 상태 확인',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetCommonOkDto,
  })
  @ApiResponse({ status: 500, description: '내부 에러' })
  async getHello() {
    return this.appService.getHealth();
  }
}
