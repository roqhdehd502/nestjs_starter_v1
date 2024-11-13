import { randomBytes } from 'crypto';
import { AES, enc } from 'crypto-js';

/**
 * AES 암호화 함수
 */
export const encryptCredential = (data: string, secretKey: string) => {
  return AES.encrypt(data, secretKey).toString();
};

/**
 * AES 복호화 함수
 */
export const decryptCredential = (encryptedData: string, secretKey: string) => {
  const bytes = AES.decrypt(encryptedData, secretKey);
  return bytes.toString(enc.Utf8);
};

/**
 * echostr 생성 함수
 */
export const generateEchostr = (length: number = 16) => {
  return randomBytes(length).toString('hex'); // input: 16 / output: 30-40 characters long
};
