import { HttpError } from 'routing-controllers';
import { Response } from '../types';

export class NotAcceptableError extends HttpError {
  public data: unknown;

  constructor(message?: string, data?: unknown) {
    super(406);
    Object.setPrototypeOf(this, NotAcceptableError.prototype);
    this.message = message ?? 'Not acceptable.';
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
