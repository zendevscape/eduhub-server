import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = (exception as Error).message ?? 'Internal server error.';

    response.status(status).json({
      success: false,
      message,
    });
  }
}
