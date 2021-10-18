import { HttpError } from './http.error';

export class InternalServerError extends HttpError {
  public constructor(message?: string, data?: unknown) {
    super(500, message ?? 'Internal server error.', data);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
