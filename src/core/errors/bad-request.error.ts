import { HttpError } from './http.error';

export class BadRequestError extends HttpError {
  public constructor(message?: string, data?: unknown) {
    super(400, message ?? 'Bad request.', data);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
