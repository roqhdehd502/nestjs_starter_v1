import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error: any = exception.getResponse();

    switch (status) {
      case 400:
        response.status(status).json({
          code: status,
          error: error.error as string,
          message: Array.isArray(error.message)
            ? (error.message[0] as string)
            : (error.message as string),
          details: Array.isArray(error.message)
            ? [...error.message]
            : [error.message],
        });
        break;
      default:
        response.status(status).json({
          code: status,
          error: error.error as string,
          message: error.message as string,
        });
    }
  }
}
