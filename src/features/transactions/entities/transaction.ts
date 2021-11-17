import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import type { User } from '../../users/entities';

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

  @CreateDateColumn()
  public date: Date;

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

  @Column()
  public status: TransactionStatus;
}
