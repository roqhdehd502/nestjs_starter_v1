import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { User } from './user.model';

@Schema()
export class Post extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author: User;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @Prop({
    default: Date.now,
  })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @Prop()
  @IsDate()
  updatedAt?: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

export class PostDTO {
  @ApiProperty()
  author: User;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}

export class PostWithPutPostDTO {
  @ApiProperty({ example: '제목' })
  title: string;

  @ApiProperty({ example: '내용' })
  content: string;
}
