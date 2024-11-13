import { Document, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import { User } from './user';

export interface UserHash extends Document {
  _id: Schema.Types.ObjectId;
  user: User; // 유저
  hash: string; // 비밀번호 해시
  createdAt: Date;
  updatedAt: Date;
}

const userHashSchema = new Schema<UserHash>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
    required: true,
  },
  hash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userHashSchema.plugin(autopopulate);

export default userHashSchema;
