import { Document, Schema } from 'mongoose';

export interface Log extends Document {
  _id: Schema.Types.ObjectId;
  type: string;
  code: string;
  ip: string;
  url: string;
  pathName: string;
  method: string;
  headers: any;
  searchParams?: any;
  body?: any;
  formData?: any;
  message?: string;
  createdAt: Date;
}

const logSchema = new Schema<Log>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  type: { type: String, required: true },
  code: { type: String, required: true },
  ip: { type: String, required: true },
  url: { type: String, required: true },
  pathName: { type: String, required: true },
  method: { type: String, required: true },
  headers: { type: Object, required: true },
  searchParams: { type: Object, required: false },
  body: { type: Object, required: false },
  formData: { type: Object, required: false },
  message: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default logSchema;
