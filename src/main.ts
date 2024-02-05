import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exceiption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // 전역 예외처리
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger 문서 적용
  const config = new DocumentBuilder()
    .setTitle('NestJS Starter V1')
    .setDescription('NestJS V1 템플릿 입니다.')
    .setVersion('1.0.0')
    .build();
  app.setGlobalPrefix('v1');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document);

  // 앱 포트 적용
  await app.listen(4000);
}
bootstrap();
