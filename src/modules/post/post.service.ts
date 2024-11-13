import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LogService } from '../log/log.service';
import { AuthService } from '../auth/auth.service';
import { PostPostDto, PutPostDto } from './dto/post.request.dto';
import { GetCommonOkDto } from '../app/dto/app.response.dto';
import { PostModel } from '~/models';
import { CommonSort } from '~/common/constants';
import { GetPostDto, GetPostListDto } from './dto/post.response.dto';
import { Post } from '~/models/post';
import { localizedFormatDate } from '~/utils/date';
import { filterAuthor } from '~/utils/filter';

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

  // * 게시글 수정
  async putPost(
    request: Request,
    body: PutPostDto,
  ): Promise<GetCommonOkDto> {
    const LOG_CODE = 'put-post';

    const { id, title, content } = body;

    try {
      const user = await this.authService.getUserAsToken(request);

      // * 수정할 게시글 찾기
      const post = await PostModel.findOne<Post>({
        _id: id,
        author: user.id,
      });
      if (!post) {
        throw new NotFoundException(
          '수정할 게시글을 찾을 수 없습니다',
          {
            cause: new Error(),
            description: 'Not Found Post',
          },
        );
      }
      if (post.isDelete) {
        throw new NotFoundException(
          '삭제된 게시글입니다',
          {
            cause: new Error(),
            description: 'Deleted Post',
          },
        );
      }

      // * 게시글 수정
      post.title = title;
      post.content = content;
      post.updatedAt = new Date();
      await post.save();

      this.logService.createLog({
        request,
        code: LOG_CODE,
        message: 'put post.',
      });

      return {
        status: 'ok',
      };
    } catch (error) {
      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong put post.',
      });

      throw error;
    }
  }

  // * 게시글 목록
  async getPostList(
    request: Request,
    query: {
      sort: CommonSort;
      limit: number;
      page: number;
    },
  ): Promise<GetPostListDto> {
    const LOG_CODE = 'get-post-list';

    const { sort, limit, page } = query;

    try {
      // * 총 레코드 수
      const totalCount = await PostModel.countDocuments();

      // * 목록 조회
      const posts = await PostModel.find<Post>({
        isDelete: false,
      })
        .sort({ createdAt: sort === CommonSort.ASC ? 1 : -1 })
        .limit(limit)
        .skip(limit * (page - 1));

      // * 결과값 반환
      const resultList: GetPostDto[] = posts.map((item) => {
        const author = filterAuthor(item.author.email);

        return {
          id: item._id.toString(),
          title: item.title,
          content: item.content,
          author,
          createdAt: localizedFormatDate(item.createdAt),
          updatedAt: localizedFormatDate(item.updatedAt),
        };
      });

      return {
        totalCount,
        page,
        limit,
        resultList,
      };
    } catch (error) {
      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong read post list.',
      });
      throw error;
    }
  }

  // * 게시글 상세
  async getPost(
    request: Request,
    param: {
      id: string;
    },
  ): Promise<GetPostDto> {
    const LOG_CODE = 'get-post';

    const { id } = param;

    try {
      // * 상세 조회
      const post = await PostModel.findById<Post>(id);
      if (!post) {
        throw new NotFoundException(
          '게시글을 찾을 수 없습니다',
          {
            cause: new Error(),
            description: 'Not Found Post',
          },
        );
      }
      if (post.isDelete) {
        throw new NotFoundException(
          '삭제된 게시글입니다',
          {
            cause: new Error(),
            description: 'Deleted Post',
          },
        );
      }

      // * 결과값 반환
      const author = filterAuthor(post.author.email);

      return {
        id: post._id.toString(),
        title: post.title,
        content: post.content,
        author,
        createdAt: localizedFormatDate(post.createdAt),
        updatedAt: localizedFormatDate(post.updatedAt),
      };
    } catch (error) {
      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong read post.',
      });
      throw error;
    }
  }

  // * 게시글 삭제
  async deletePost(
    request: Request,
    param: {
      id: string;
    },
  ): Promise<GetCommonOkDto> {
    const LOG_CODE = 'delete-post';

    const { id } = param;

    try {
      const user = await this.authService.getUserAsToken(request);

      // * 상세 조회
      const post = await PostModel.findOne<Post>({
        _id: id,
        author: user.id,
      });
      if (!post) {
        throw new NotFoundException(
          '삭제할 게시글을 찾을 수 없습니다',
          {
            cause: new Error(),
            description: 'Not Found Post',
          },
        );
      }
      if (post.isDelete) {
        throw new ConflictException('이미 삭제된 게시글 입니다', {
          cause: new Error(),
          description: 'Already deleted Post',
        });
      }

      // * 게시글 삭제
      post.isDelete = true;
      post.updatedAt = new Date();
      await post.save();

      this.logService.createLog({
        request,
        code: LOG_CODE,
        message: 'delete post.',
      });

      return {
        status: 'ok',
      }
    } catch (error) {
      this.logService.createLog({
        request,
        type: 'error',
        code: LOG_CODE,
        message: 'wrong delete post.',
      });
      throw error;
    }
  }
}
