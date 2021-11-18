import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import type { User } from '../../users/entities';
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

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne('User', 'transactions')
  @JoinColumn({
    name: 'user_id',
  })
  public user: User;

  @RelationId('user')
  public userId: string;

  @Column()
  public note: string;

  @Column()
  public type: TransactionType;

  @Column()
  public amount: number;

  @Column({
    name: 'previous_balance',
  })
  public previousBalance: number;

  @Column()
  public balance: number;

  @OneToOne('Payment', 'transaction')
  public payment: Payment;

  @RelationId('payment')
  public paymentId: string;

  @OneToOne('Transfer', 'sourceTransaction')
  public sourceTransfer: Transfer;

  @RelationId('sourceTransfer')
  public sourceTransferId: string;

  @OneToOne('Transfer', 'destinationTransaction')
  public destinationTransfer: Transfer;

  @RelationId('destinationTransfer')
  public destinationTransferId: string;

  @Column()
  public status: TransactionStatus;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;
}
