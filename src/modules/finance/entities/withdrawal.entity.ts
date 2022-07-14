import { Transaction } from './transaction.entity';

export class Withdrawal extends Transaction {
  public withdrwalId: string;
  public userId: string;
  public externalId: string;
  public channelCategory: string;
  public channelCode: string;
  public accountNumber: string;
}
