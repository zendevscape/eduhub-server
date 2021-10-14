import { HttpError } from 'routing-controllers';
import { Response } from '../types';

export class UnauthorizedError extends HttpError {
  public data: unknown;

  constructor(message?: string, data?: unknown) {
    super(401);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    this.message = message ?? 'Unauthorized.';
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
