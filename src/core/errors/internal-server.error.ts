import { HttpError } from './http.error';
import { Response } from '../types';

export class InternalServerError extends HttpError {
  public data: unknown;

  constructor(message?: string, data?: unknown) {
    super(500);
    Object.setPrototypeOf(this, InternalServerError.prototype);
    this.message = message ?? 'Internal server error.';
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
