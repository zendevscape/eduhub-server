import type { User } from '../../user/entities';
import type { Transaction } from './transaction.entity';

export enum TransferStatus {
  Success = 'success',
  Failed = 'failed',
}

export class Transfer {
  public id: string;
  public sourceUser: User;
  public sourceUserId: string;
  public destinationUser: User;
  public destinationUserId: string;
  public sourceTransaction: Transaction;
  public sourceTransactionId: string;
  public destinationTransaction: Transaction;
  public destinationTransactionId: string;
  public amount: number;
  public status: TransferStatus;
}
