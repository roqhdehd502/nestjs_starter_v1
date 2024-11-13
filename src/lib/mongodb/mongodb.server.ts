import * as dotenv from 'dotenv';
import mongoose, { Connection } from 'mongoose';

// * 환경 변수 설정 초기화
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_NAME = process.env.MONGODB_NAME;

if (!MONGODB_URI || !MONGODB_NAME) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const connectionOptions = {
  bufferCommands: false,
  authSource: 'admin', // 만약 인증 소스가 admin DB라면 추가
  // replicaSet: 'rs0', // 레플리카셋이 있다면 추가
};

/**
 * MongoDB 연결
 * @description 연결하고자 하는 MongoDB 서버의 주소와 DB 이름을 입력하여 연결
 */
export const starter: Connection = mongoose.createConnection(
  `${MONGODB_URI}/${MONGODB_NAME}`,
  connectionOptions,
);
