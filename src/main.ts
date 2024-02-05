import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('NestJS Starter V1')
    .setDescription('NestJS V1 템플릿 입니다.')
    .setVersion('1.0.0')
    .build();
  app.setGlobalPrefix('v1');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document);
  await app.listen(4000);
}
bootstrap();
