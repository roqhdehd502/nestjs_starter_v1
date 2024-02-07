import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

// mongoose 모듈 SchemaOptions 스키마 옵션 설정 (필요시에만 적용)
// const options: SchemaOptions = {
//   timestamps: true,
//   versionKey: false,
// };

@Schema()
export class Post extends Document {
  @IsString()
  @IsNotEmpty()
  author: string;

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

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  updatedAt?: Date;

  readonly readOnlyData: {
    id: string;
    author: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
  };
}

export const PostSchema = SchemaFactory.createForClass(Post);

export class PostDTO {
  @ApiProperty()
  author: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}

export class PostPostDTO {
  @ApiProperty({ example: '홍길동' })
  author: string;

  @ApiProperty({ example: '제목' })
  title: string;

  @ApiProperty({ example: '내용' })
  content: string;
}
