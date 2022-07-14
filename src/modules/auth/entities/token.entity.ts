import type { User } from '../../user/entities';

export enum TokenType {
  Access = 'access',
  Refresh = 'refresh',
  ResetPassword = 'reset_password',
}

export class Token {
  public id: string;
  public user: User;
  public userId: string;
  public token: string;
  public type: TokenType;
}
