import {
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AppService {
  // private readonly logger = new Logger(AppService.name);

  constructor() {}

  // * 헬스 체크
  async getHealth(): Promise<string> {
    try {
      return 'ok';
    } catch (error) {
      throw error;
    }
  }
}