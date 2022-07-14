import { Transaction } from './transaction.entity';

export class Transfer extends Transaction {
  public transferId: string;
  public userId: string;
  public fromUserId: string;
  public toUserId: string;
}
