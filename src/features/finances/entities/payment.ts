import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import type { User } from '../../users/entities';
import type { Transaction } from './transaction';

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

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    name: 'external_payment_id',
  })
  public externalPaymentId: string;

  @ManyToOne('User')
  @JoinColumn({
    name: 'user_id',
  })
  public user: User;

  @RelationId('user')
  public userId: string;

  @Column({
    name: 'user_name',
  })
  public userName: string;

  @OneToOne('Transaction', 'payment')
  @JoinColumn({
    name: 'transaction_id',
  })
  public transaction: Transaction;

  @RelationId('transaction')
  public transactionId: string;

  @Column({
    name: 'channel_category',
  })
  public channelCategory: PaymentChannelCategory;

  @Column({
    name: 'channel_code',
  })
  public channelCode: PaymentChannelCode;

  @Column({
    name: 'account_number',
  })
  public accountNumber: string;

  @Column()
  public amount: number;

  @Column({
    name: 'expiration_date',
  })
  public expirationDate: Date;

  @Column()
  public status: PaymentStatus;
}
