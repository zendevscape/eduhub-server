import { HttpError } from 'routing-controllers';
import { Response } from '../types';

export class NotFoundError extends HttpError {
  public data: unknown;

  constructor(message?: string, data?: unknown) {
    super(404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.message = message ?? 'Not found.';
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
