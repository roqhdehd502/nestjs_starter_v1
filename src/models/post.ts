import { Document, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import { User } from './user';
import { CommonStatus } from '~/common/constants';

export interface Post extends Document {
  _id: Schema.Types.ObjectId;
  author: User; // 작성자
  title: string; // 제목
  content: string; // 내용
  status: CommonStatus; // 상태
  isDelete: boolean; // 삭제 여부
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
  status: {
    type: String,
    enum: Object.values(CommonStatus),
    default: CommonStatus.ACTIVE,
  },
  isDelete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

postSchema.plugin(autopopulate);

export default postSchema;


