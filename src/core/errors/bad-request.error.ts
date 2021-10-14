import { HttpError } from 'routing-controllers';
import { Response } from '../types';

export class BadRequestError extends HttpError {
  public data: unknown;

  constructor(message?: string, data?: unknown) {
    super(400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
    this.message = message ?? 'Bad request.';
    this.data = data;
  }

  toJSON(): Response<unknown> {
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
