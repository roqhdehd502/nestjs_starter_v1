# NestJS Starter V1

NestJS 기반으로 제작된 API 템플릿 입니다.
NestJS, Typescript, Swagger, MongoDB(Mongoose) 등이 적용되어 있습니다.

## 구성

현재 템플릿에서는 다음과 같은 라이브러리가 적용되어 있습니다.

```json
"dependencies": {
  "@nestjs/common": "^10.0.0",
  "@nestjs/config": "^3.1.1",
  "@nestjs/core": "^10.0.0",
  "@nestjs/jwt": "^10.2.0",                      | jwt/NestJS JWT 라이브러리
  "@nestjs/mongoose": "^10.0.2",                 | mongoose/NestJS ORM 라이브러리
  "@nestjs/passport": "^10.0.3",                 | passport/NestJS 인증 라이브러리
  "@nestjs/platform-express": "^10.0.0",         | express.js/NestJS 플랫폼 라이브러리
  "@types/cookie-parser": "^1.4.6",
  "@types/passport-jwt": "^4.0.1",
  "@types/passport-local": "^1.0.38",
  "bcrypt": "^5.1.1",                            | 암호화 라이브러리
  "class-transformer": "^0.5.1",                 | 클래스 폼 라이브러리
  "class-validator": "^0.14.1",                  | 클래스 검증 라이브러리
  "cookie-parser": "^1.4.6",                     | 쿠키 파싱 라이브러리
  "crypto-js": "^4.2.0",                         | 암호화 라이브러리
  "dayjs": "^1.11.13",                           | 날짜 설정 라이브러리
  "ioredis": "^5.4.1",                           | redis 라이브러리
  "joi": "^17.12.1",                             | 입력 검증 라이브러리
  "mongoose": "^8.1.1",                          | mongoose ORM 라이브러리
  "morgan": "^1.10.0",                           | 로깅 라이브러리
  "passport": "^0.7.0",                          | passport 인증 라이브러리
  "passport-jwt": "^4.0.1",
  "passport-local": "^1.0.0",
  "reflect-metadata": "^0.1.13",                 | meta data 라이브러리
  "rxjs": "^7.8.1"                               | Observable 객체 타입 처리 라이브러리
},
```

## 설치

2023년 09월 11일, [Node 16버전](https://nodejs.org/en/blog/announcements/nodejs16-eol)의 지원이 중단(End-of-Life) 되었습니다.  
따라서, 로컬에 기본적으로 18버전 이상의 node.js가 설치되어 있어야합니다.

### 패키지 설치하기

```bash
yarn
```

### 환경변수 설정

환경 변수를 설정합니다. 아래 커맨드로 .env.example을 복사하여 .env 파일을 복사하여 만들어 줍니다.

```bash
cp .env.example .env
```

이후 .env를 개발 환경에 맞게 수정해줍니다.

### 앱 실행

셋업이 끝났다면, 현재 환경에 맞게 앱을 실행해줍니다.

```bash
# 개발 환경 앱 실행 (주로 해당 커맨드를 사용)
yarn start:dev

# 디버깅 환경 앱 실행
yarn start:debug

# 빌드 환경 앱 실행
yarn start:prod
```

## 디렉토리 구조

```
├── src                              | src 디렉토리
│   ├── common                       | 공용 설정 디텍토리
│   │   ├── constants.ts             | 상수값 설정 파일
│   │   └── global.d.ts              | 글로벌 타입 설정 파일
│   ├── filters                      | NestJS 필터링 처리 디렉토리
│   │   └── http-exception.filter.ts | HTTP 예외처리 필터
│   ├── lib                          | 외부 라이브러리 관리 디렉토리
│   │   ├── crypto                   | crypto 라이브러리 암호화 관리 디렉토리
│   │   ├── mongodb                  | mongodb 라이브러리 db 관리 디렉토리
│   │   ├── nodemailer               | nodemailer 라이브러리 메일 전송 관리 디렉토리
│   │   └── redis                    | ioredis 라이브러리 redis 관리 디렉토리
│   ├── models                       | mongo DB 모델 디렉토리
│   ├── modules                      | NestJS 모듈 디렉토리
│   │   ├── app                      | app 공용 모듈 디렉토리
│   │   ├── auth                     | auth 인증 모듈 디렉토리
│   │   ├── log                      | log 로깅 모듈 디렉토리
│   │   ├── post                     | post 게시글 모듈 디렉토리
│   │   ├── redis                    | redis 레디스 모듈 디렉토리
│   │   └── user                     | user 유저 모듈 디렉토리
│   ├── utils                        | 유틸리티 관리 디렉토리
│   │   ├── auth.ts                  | 인증 유틸 파일
│   │   ├── calculate.ts             | 계산 유틸 파일
│   │   ├── date.ts                  | 날짜 유틸 파일
│   │   ├── filter.ts                | 필터링 유틸 파일
│   │   ├── generate.ts              | 생성 유틸 파일
│   │   └── utils.server.ts          | 서버 요청 및 응답 처리 유틸 파일
│   └── main.ts                      | NestJS 메인 실행 파일
├── test                             | NestJS 테스트 코드 디렉토리
├── .env.example                     | 환경변수 예제 파일
├── .eslintrc.js                     | eslint 설정 파일
├── .gitignore                       | git 커밋 무시 설정
├── .prettierrc                      | prettier 설정 파일
├── nest-cli.json                    | nest-cli 프로젝트 자동화 설정 파일
├── package.json                     | package.json
├── README.md
└── tsconfig.json                    | 타입스크립트 설정 파일
```

## 가이드

### module

해당 기능 로직에 해당되는 controller, service, model 계층 로직을 구현한 다음 module 파일에 다음과 같이 구현합니다.

```ts
import { Module } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
```

전역적인 성격을 띄는 모듈의 경우 @Global 데코레이터를 통해 다음과 같이 구현합니다.

```ts
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

새 모듈을 추가하거나 수정이 필요한 경우 app.module.ts에서 관리합니다.

```ts
/// <reference types="node" />

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import * as Joi from 'joi';
import morgan from 'morgan';

import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { RedisModule } from '../redis/redis.module';
import { LogModule } from '../log/log.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    // * 전역 모듈
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    AuthModule,
    RedisModule,
    LogModule,
    UserModule,
    // * 로컬 모듈
    PostModule,
  ],
  controllers: [AppController],
  providers: [
    // * 전역 파이프 설정시 호출
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // * 전역 서비스 설정시 호출
    AppService,
  ],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // * consumer 디버그 로그
    consumer
      .apply(
        morgan(
          '\x1b[7m:date[iso]\x1b[0m :method :url :status :res[content-length] - :response-time ms',
        ),
      )
      .forRoutes('*');
  }
}
```

### controller

controller에서는 module에 소속된 해당 각 기능들을 제어해주는 코드를 작성합니다.

@nestjs/swagger 모듈로 인해 별도의 데코레이터('@')만 달아주어도 빌드시 자동으로 문서화를 할 수 있습니다.
따라서, controller 파일에 다음과 같은 방법으로 swagger 문서를 자동화 해줍니다.

```ts
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
    description: '게시글 작성하기',
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
  async postPost(@Req() request: Request, @Body() body: PostPostDto) {
    return await this.postService.postPost(request, body);
  }

  // * 게시글 수정
  @Put()
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '게시글 수정',
    description: '게시글 수정하기',
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
  async putPost(@Req() request: Request, @Body() body: PutPostDto) {
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
  async getPost(@Req() request: Request, @Param('id') id: string) {
    return await this.postService.getPost(request, {
      id,
    });
  }

  // * 게시글 삭제
  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '게시글 삭제',
    description: '게시글 삭제하기',
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
  async deletePost(@Req() request: Request, @Param('id') id: string) {
    return await this.postService.deletePost(request, {
      id,
    });
  }
}
```

### service

service에서는 module에 소속된 해당 기능의 비즈니스 로직을 구현 해주는 코드를 작성합니다.

```ts
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
import { formatDate } from '~/utils/date';
import { filterAuthor } from '~/utils/filter';

@Injectable()
export class PostService {
  // private readonly logger = new Logger(PostService.name);

  constructor(
    private readonly logService: LogService,
    private readonly authService: AuthService,
  ) {}

  // * 게시글 작성
  async postPost(request: Request, body: PostPostDto): Promise<GetCommonOkDto> {
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
  async putPost(request: Request, body: PutPostDto): Promise<GetCommonOkDto> {
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
        throw new NotFoundException('수정할 게시글을 찾을 수 없습니다', {
          cause: new Error(),
          description: 'Not Found Post',
        });
      }
      if (post.isDelete) {
        throw new NotFoundException('삭제된 게시글입니다', {
          cause: new Error(),
          description: 'Deleted Post',
        });
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
          createdAt: formatDate(item.createdAt),
          updatedAt: formatDate(item.updatedAt),
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
        throw new NotFoundException('게시글을 찾을 수 없습니다', {
          cause: new Error(),
          description: 'Not Found Post',
        });
      }
      if (post.isDelete) {
        throw new NotFoundException('삭제된 게시글입니다', {
          cause: new Error(),
          description: 'Deleted Post',
        });
      }

      // * 결과값 반환
      const author = filterAuthor(post.author.email);

      return {
        id: post._id.toString(),
        title: post.title,
        content: post.content,
        author,
        createdAt: formatDate(post.createdAt),
        updatedAt: formatDate(post.updatedAt),
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
        throw new NotFoundException('삭제할 게시글을 찾을 수 없습니다', {
          cause: new Error(),
          description: 'Not Found Post',
        });
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
      };
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
```

### dto (data transfer object)

dto에서는 해당 기능에 필요한 요청 및 응답 객체를 지정해줍니다.

또한, dto에서도 NestJS에서 자체적으로 지원하는 swagger 라이브러리를 통해 문서를 자동화 할 수 있습니다.

```ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// * 게시글 작성 DTO
export class PostPostDto {
  @ApiProperty({
    type: 'string',
    description: '제목',
    example: '제목',
  })
  @IsString({ message: '제목은 문자열로 입력해야 합니다' })
  readonly title: string;

  @ApiProperty({
    type: 'string',
    description: '내용',
    example: '내용',
  })
  @IsString({ message: '내용은 문자열로 입력해야 합니다' })
  readonly content: string;
}

// * 게시글 수정 DTO
export class PutPostDto extends PostPostDto {
  @ApiProperty({
    type: 'string',
    description: '고유 id',
    example: '고유 id',
  })
  @IsString({ message: '고유 id는 문자열로 입력해야 합니다' })
  readonly id: string;
}
```

```ts
import { ApiProperty } from '@nestjs/swagger';

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
```

기타 자세한 사용법은 [해당 문서](https://docs.nestjs.com/openapi/introduction)를 참고하세요.
