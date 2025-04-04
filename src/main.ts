import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { description, name, version } from '../package.json';
import { starter } from './lib/mongodb/mongodb.server';
import { AppModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  // dotenv 환경 변수 설정
  dotenv.config();

  // NestJS 앱 생성
  const app = await NestFactory.create(AppModule);

  // 전역 예외처리
  app.useGlobalFilters(new HttpExceptionFilter());

  // 엔드포인트 접두 설정
  app.setGlobalPrefix('v1');

  // 입력값 검증 파이프 설정
  app.useGlobalPipes(new ValidationPipe());

  // NestJS ConfigService 설정
  const configService = app.get(ConfigService);

  // MongoDB 연결
  await starter;

  // API Base URL
  // NOTE-1: SwaggerUI 내 Server에서 사용할 목적으로 API Base URL을 설정
  // NOTE-2: 필요시 활성화
  // const API_BASE_URL = configService.get<string>('BASE_URL');
  // if (!API_BASE_URL) {
  //   throw new Error('Please define the BASE_URL environment variable');
  // }

  // CORS 설정 (특정 도메인만 허용)
  // NOTE: 로컬끼리 연동 테스트할 때 사용
  if (configService.get<string>('NODE_ENV') === 'local') {
    app.enableCors({
      origin: ['http://localhost:3000'], // 허용할 프론트엔드 도메인
      methods: 'GET,POST,PUT,DELETE', // 허용할 HTTP 메소드
      allowedHeaders: 'Content-Type, Authorization', // 허용할 헤더
    });
  }

  // SwaggerUI 문서 적용
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    // .addServer(API_BASE_URL)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document, {
    customSiteTitle: name,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });

  // 앱 포트 적용
  await app.listen(configService.get<number>('PORT') || 4000);
}
bootstrap();
