import { HttpError } from './http.error';

export class MethodNotAllowedError extends HttpError {
  public constructor(message?: string, data?: unknown) {
    super(405, message ?? 'Method not allowed.', data);
    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
  }
}
