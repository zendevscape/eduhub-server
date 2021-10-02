import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities';

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

  @ManyToOne(() => User, (user) => user.transactions)
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
