import { HttpError } from './http.error';

export class NotAcceptableError extends HttpError {
  public constructor(message?: string, data?: unknown) {
    super(406, message ?? 'Not acceptable.', data);
    Object.setPrototypeOf(this, NotAcceptableError.prototype);
  }
}
