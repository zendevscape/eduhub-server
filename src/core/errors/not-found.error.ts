import { HttpError } from './http.error';

export class NotFoundError extends HttpError {
  public constructor(message?: string, data?: undefined) {
    super(404, message ?? 'Not found.', data);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
