import { Document, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import { CommonStatus } from '~/common/constants';

export interface User extends Document {
  _id: Schema.Types.ObjectId;
  email?: string; // 이메일
  status: CommonStatus; // 상태
  isDelete: boolean; // 삭제 여부
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  email: { type: String, required: false },
  status: {
    type: String,
    enum: Object.values(CommonStatus),
    default: CommonStatus.ACTIVE,
  },
  isDelete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.plugin(autopopulate);

export default userSchema;
