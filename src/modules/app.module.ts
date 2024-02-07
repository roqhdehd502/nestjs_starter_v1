import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { PostController } from '../controllers/post.controller';
import { AppService } from '../services/app.service';
import { PostService } from '../services/post.service';

@Module({
  imports: [],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
