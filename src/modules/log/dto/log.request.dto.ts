import { IsDate, IsOptional, IsString } from 'class-validator';

// * 로그 추가 DTO
export class CreateLogDTO {
  @IsString()
  readonly type: LogType;

  @IsString()
  readonly code: string;

  @IsString()
  readonly ip: string;

  @IsString()
  readonly url: string;

  @IsString()
  readonly pathName: string;

  @IsString()
  readonly method: string;

  readonly headers: any;

  @IsOptional()
  readonly searchParams: any;

  @IsOptional()
  readonly body: any;

  @IsOptional()
  readonly formData: FormData;

  @IsOptional()
  @IsString()
  readonly message: string;

  @IsDate()
  readonly createdAt: Date;
}
