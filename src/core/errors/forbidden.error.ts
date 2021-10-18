import { HttpError } from './http.error';

export class ForbiddenError extends HttpError {
  public constructor(message?: string, data?: unknown) {
    super(500, message ?? 'Forbidden.', data);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
