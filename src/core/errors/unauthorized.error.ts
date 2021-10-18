import { HttpError } from './http.error';
import { Response } from '../types';

export class UnauthorizedError extends HttpError {
  public data: unknown;

  public constructor(message?: string, data?: unknown) {
    super(401);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    this.message = message ?? 'Unauthorized.';
    this.data = data;
  }

  public toJson(): Response<unknown> {
    if (this.data) {
      return {
        success: false,
        message: this.message,
        data: this.data,
      };
    } else {
      return {
        success: false,
        message: this.message,
      };
    }
  }
}
