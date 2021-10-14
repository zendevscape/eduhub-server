import { HttpError } from 'routing-controllers';
import { Response } from '../types';

export class ForbiddenError extends HttpError {
  public data: unknown;

  constructor(message?: string, data?: unknown) {
    super(500);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
    this.message = message ?? 'Forbidden.';
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
