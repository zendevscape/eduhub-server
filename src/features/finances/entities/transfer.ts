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
import type { Transaction } from '../../transactions/entities';

export enum TransferStatus {
  Success = 'success',
  Failed = 'failed',
}

@Entity('transfers')
export class Transfer {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne('User')
  @JoinColumn({
    name: 'source_user_id',
  })
  public sourceUser: User;

  @RelationId('sourceUser')
  public sourceUserId: string;

  @ManyToOne('User')
  @JoinColumn({
    name: 'destination_user_id',
  })
  public destinationUser: User;

  @RelationId('destinationUser')
  public destinationUserId: string;

  @OneToOne('Transaction', 'sourceTransfer')
  @JoinColumn({
    name: 'source_transaction_id',
  })
  public sourceTransaction: Transaction;

  @RelationId('sourceTransaction')
  public sourceTransactionId: string;

  @OneToOne('Transaction', 'destinationTransfer')
  @JoinColumn({
    name: 'destination_transaction_id',
  })
  public destinationTransaction: Transaction;

  @RelationId('destinationTransaction')
  public destinationTransactionId: string;

  @Column()
  public amount: number;

  @Column()
  public status: TransferStatus;
}
