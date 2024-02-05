import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostsController } from './posts/posts.controller';
import { AppService } from './app.service';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
