import {
  Injectable,
} from '@nestjs/common';
import { LogService } from '../log/log.service';
import { AuthService } from '../auth/auth.service';
import { PostPostDto } from './dto/post.request.dto';
import { GetCommonOkDto } from '../app/dto/app.response.dto';
import { PostModel } from '~/models';

@Injectable()
export class PostService {
  // private readonly logger = new Logger(PostService.name);

  constructor(
    private readonly logService: LogService,
    private readonly authService: AuthService,
  ) {}

  // * 게시글 작성
  async postPost(
    request: Request,
    body: PostPostDto,
  ): Promise<GetCommonOkDto> {
    const LOG_CODE = 'post-post';

    const { title, content } = body;

    try {
      const user = await this.authService.getUserAsToken(request);

      // * 게시글 작성
      const post = new PostModel({
        author: user.id,
        title,
        content,
      });
      await post.save();

      this.logService.createLog({
        request,
        code: LOG_CODE,
        message: 'post post.',
      });

      return {
        status: 'ok',
      };
    } catch (error) {
      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong post post.',
      });

      throw error;
    }
  }

  // * 게시글 목록

  // * 게시글 상세

  // * 게시글 수정

  // * 게시글 삭제
}
