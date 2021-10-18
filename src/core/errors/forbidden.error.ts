import { HttpError } from './http.error';
import { Response } from '../types';

export class ForbiddenError extends HttpError {
  public data: unknown;

  public constructor(message?: string, data?: unknown) {
    super(500);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
    this.message = message ?? 'Forbidden.';
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
