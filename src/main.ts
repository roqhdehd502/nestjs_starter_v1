import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(4000);
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('v1');
  await app.listen(4000);
}
bootstrap();
