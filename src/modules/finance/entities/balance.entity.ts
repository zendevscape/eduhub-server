import type { User } from '../../user/entities';

export class Balance {
  public user: User;
  public userId: string;
  public amount: number;
}
