import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users';

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

  @CreateDateColumn()
  public date: Date;

  @Column()
  public note: string;

  @Column()
  public type: TransactionType;

  @Column()
  public change: number;

  @Column()
  public balance: number;

  @Column()
  public status: TransactionStatus;
}
