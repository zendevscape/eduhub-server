import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeORMErrorFilter implements ExceptionFilter {
  public catch(error: TypeORMError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error instanceof EntityNotFoundError) {
      response.status(404).json({
        success: false,
        message: error.message + '.',
      });
    } else if (error instanceof QueryFailedError) {
      response.status(400).json({
        success: false,
        message: error.driverError.detail,
      });
    }
  }
}
