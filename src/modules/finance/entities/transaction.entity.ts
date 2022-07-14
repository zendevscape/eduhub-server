import type { User } from '../../user/entities';
import type { Payment, Transfer } from '.';

export enum TransactionType {
  Credit = 'credit',
  Debit = 'debit',
}

export enum TransactionStatus {
  Success = 'success',
  Failed = 'failed',
  Pending = 'pending',
}

export class Transaction {
  public id: string;
  public user: User;
  public userId: string;
  public note: string;
  public type: TransactionType;
  public amount: number;
  public previousBalance: number;
  public balance: number;
  public payment: Payment;
  public paymentId: string;
  public sourceTransfer: Transfer;
  public sourceTransferId: string;
  public destinationTransfer: Transfer;
  public destinationTransferId: string;
  public status: TransactionStatus;
  public created: Date;
  public updated: Date;
}
