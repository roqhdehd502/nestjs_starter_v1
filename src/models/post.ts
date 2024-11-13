import { Document, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import { User } from './user';

export interface Post extends Document {
  _id: Schema.Types.ObjectId;
  author: User; // 작성자
  title: string; // 제목
  content: string; // 내용
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<Post>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

postSchema.plugin(autopopulate);

export default postSchema;


