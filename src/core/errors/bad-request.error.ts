import { HttpError } from './http.error';
import { Response } from '../types';

export class BadRequestError extends HttpError {
  public data: unknown;

  constructor(message?: string, data?: unknown) {
    super(400, message ?? 'Bad request.');
    Object.setPrototypeOf(this, BadRequestError.prototype);
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
