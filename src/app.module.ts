import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostController } from './posts/post.controller';
import { AppService } from './app.service';
import { PostService } from './posts/post.service';

@Module({
  imports: [],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
