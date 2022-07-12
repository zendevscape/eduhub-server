import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = exception.getResponse();
    const status = exception.getStatus();
    let message = exception.message;

    if (!message.endsWith('.')) {
      message = message + '.';
    }

    if (exception instanceof NotFoundException && message.startsWith('Cannot')) {
      message = 'Route or method undefined.';
    }

    response.status(status).json({
      success: false,
      message,
      data: res.data,
    });
  }
}
