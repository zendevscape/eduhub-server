import { HttpError } from './http.error';

export class UnauthorizedError extends HttpError {
  public constructor(message?: string, data?: unknown) {
    super(401, message ?? 'Unauthorized.', data);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
