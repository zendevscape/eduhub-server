import { TransactionFlow, TransactionStatus, TransactionType } from '@prisma/client';

export class Transaction {
  public id: string;
  public userId: string;
  public note: string;
  public flow: TransactionFlow;
  public type: TransactionType;
  public amount: number;
  public previousBalance: number;
  public balance: number;
  public status: TransactionStatus;
  public createdAt: Date;
  public updatedAt: Date;
}
