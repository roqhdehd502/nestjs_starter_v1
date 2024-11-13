import { Injectable } from '@nestjs/common';

import { getIpAddress } from '~/utils/utils.server';

import { CreateLogDTO } from './dto/log.request.dto';
import { LogModel } from '~/models';

@Injectable()
export class LogService {
  constructor() {}

  async createLog({
    request,
    type = 'info',
    code,
    message,
    formData,
  }: {
    request: Request;
    type?: CreateLogDTO['type'];
    code: CreateLogDTO['code'];
    message?: CreateLogDTO['message'];
    formData?: CreateLogDTO['formData'];
  }) {
    try {
      const url = new URL(
        request.url,
        process.env.BASE_URL || 'http://localhost:4000',
      );

      await LogModel.create({
        type,
        code,
        ip: getIpAddress(request),
        url: url.href,
        pathName: url.pathname,
        method: request.method,
        headers: JSON.parse(JSON.stringify(request.headers)),
        searchParams: Object.fromEntries(url.searchParams),
        body: request.body ? JSON.stringify(request.body) : null, // * Vercel body 데이터 인젝션으로 인해 null 처리. formData만 사용할 것
        formData: formData ? Object.fromEntries(formData!) : null,
        message,
      });
    } catch (error) {
      throw error;
    }
  }
}
