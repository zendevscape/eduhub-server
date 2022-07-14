import { Transaction } from './transaction.entity';

export class Deposit extends Transaction {
  public depositId: string;
  public userId: string;
  public externalId: string;
  public channelCategory: string;
  public channelCode: string;
  public accountNumber: string;
  public expiration: Date;
}
