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
