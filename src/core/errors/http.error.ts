import { Response } from '../types';

export abstract class HttpError extends Error {
  public httpCode: number;
  public data: unknown;

  public constructor(httpCode: number, message?: string, data?: unknown) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
    this.httpCode = httpCode;
    this.data = data;
    this.stack = new Error().stack;
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
