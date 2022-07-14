import type { User } from '../../user/entities';
import type { Transaction } from './transaction.entity';

export enum PaymentChannelCategory {
  VirtualAccount = 'virtual_account',
}

export enum PaymentChannelCode {
  BCA = 'bca',
  BNI = 'bni',
  BRI = 'bri',
  Mandiri = 'mandiri',
}

export enum PaymentStatus {
  Success = 'success',
  Failed = 'failed',
  Pending = 'pending',
  Creating = 'creating',
  Canceled = 'canceled',
}

export class Payment {
  public id: string;
  public externalPaymentId: string;
  public user: User;
  public userId: string;
  public userName: string;
  public transaction: Transaction;
  public transactionId: string;
  public channelCategory: PaymentChannelCategory;
  public channelCode: PaymentChannelCode;
  public accountNumber: string;
  public amount: number;
  public expirationDate: Date;
  public status: PaymentStatus;
}
