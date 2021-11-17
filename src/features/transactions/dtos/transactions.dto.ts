import { Payment, Transfer } from '../../finances/entities';
import { TransactionStatus, TransactionType } from '../entities';

export interface ReadTransactionParamsReq {
  guardianId?: string;
  sellerId?: string;
  studentId?: string;
  transactionId: string;
}

export interface ReadTransactionsParamsReq {
  guardianId?: string;
  sellerId?: string;
  studentId?: string;
}

interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  previousBalance: number;
  balance: number;
  note: string;
  payment?: Payment;
  transfer?: Transfer;
  status: TransactionStatus;
  created: Date;
  updated: Date;
}

export interface TransactionRes extends Transaction {}

export interface TransactionsRes extends Array<Transaction> {}

export interface ReadTransactionRes {
  transaction: TransactionRes;
}

export interface ReadTransactionsRes {
  transactions: TransactionsRes;
}
