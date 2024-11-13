import * as dotenv from 'dotenv';

// * 환경 변수 설정 초기화
dotenv.config();

/**
 * const
 * @description 공용 상수
 * @example 대문자 및 스네이크 케이스로 표기할 것
 */
// * 개발 환경
export const NODE_ENV = process.env.NODE_ENV as string;

// * API 키
export const BASE_API_KEY = process.env.BASE_API_KEY as string;
export const BASE_SECRET_KEY = process.env.BASE_SECRET_KEY as string;

// * 공용 HTTP 헤더 키
export const HEADER_AUTHORIZATION = 'authorization' as const;
export const HEADER_REFRESH = 'refresh' as const;
export const HEADER_API_KEY = 'apikey' as const;
export const HEADER_SECRET_KEY = 'secretkey' as const;

// * JWT 환경
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME as string;
export const JWT_REFRESH_EXPIRATION_TIME = process.env
  .JWT_REFRESH_EXPIRATION_TIME as string;

// * 이메일 환경
export const MAIL_ID = process.env.MAIL_ID as string;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD as string;

/**
 * enum
 * @description enum 상수
 * @example 대문자로 시작해서 파스칼 케이스로 표기할 것
 */
// * 공용 활성화 상태
export enum CommonStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

// * 공용 정렬 방식
export enum CommonSort {
  ASC = 'asc',
  DESC = 'desc',
}

// * 이메일 종류
export enum EmailType {
  RESET_PASSWORD = 'resetPassword',
  ETC = 'etc',
}

/**
 * map
 * @description 매핑 상수
 * @example 대문자 및 스네이크 케이스로 표기할 것
 */
