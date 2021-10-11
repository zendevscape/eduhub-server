import { HttpError } from 'routing-controllers';

export class InvariantError extends HttpError {
  public operationName: string;
  public args: any[];

  constructor(message: string, args: any[] = []) {
    super(400);
    Object.setPrototypeOf(this, InvariantError.prototype);
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
