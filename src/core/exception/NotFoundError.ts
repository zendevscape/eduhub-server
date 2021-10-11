import { HttpError } from 'routing-controllers';

export class NotFoundError extends HttpError {
  public operationName: string;
  public args: any[];

  constructor(message: string, args: any[] = []) {
    super(400);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.message = message;
    this.args = args;
  }

  toJSON() {
    return {
      success: false,
      message: this.message,
    };
  }
}
