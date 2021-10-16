import { HttpError } from './http.error';
import { Response } from '../types';

export class NotFoundError extends HttpError {
  public data: undefined;

  constructor(message?: string, data?: undefined) {
    super(404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.message = message ?? 'Not found.';
    this.data = data;
  }

  public toJson(): Response<unknown> {
    if (this.data !== undefined) {
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
