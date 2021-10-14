import { HttpError } from 'routing-controllers';
import { Response } from '../types';

export class MethodNotAllowedError extends HttpError {
  public data: unknown;

  constructor(message?: string, data?: unknown) {
    super(405);
    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
    this.message = message ?? 'Method not allowed.';
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
