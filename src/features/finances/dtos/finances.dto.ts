import {
  PaymentChannelCategory,
  PaymentChannelCode,
  PaymentStatus,
  TransactionStatus,
  TransactionType,
  TransferStatus,
} from '../entities';

export interface CreatePaymentBodyReq {
  channelCategory: PaymentChannelCategory;
  channelCode: PaymentChannelCode;
  amount: number;
}

export interface CreatePaymentParamsReq {
  guardianId?: string;
  sellerId?: string;
  studentId?: string;
}

export interface CreateTransferBodyReq {
  destinationUserId: string;
  amount: number;
}

export interface CreateTransferParamsReq extends CreatePaymentParamsReq {}

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

export interface ReceiveCallbacksBodyReq {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ReceiveCallbacksHeadersReq extends ReceiveCallbacksBodyReq {}

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

interface Payment {
  id: string;
  externalPaymentId: string;
  userId: string;
  userName: string;
  transactionId: string;
  channelCategory: PaymentChannelCategory;
  channelCode: PaymentChannelCode;
  accountNumber: string;
  amount: number;
  expirationDate: Date;
  status: PaymentStatus;
}

interface Transfer {
  id: string;
  sourceUserId: string;
  destinationUserId: string;
  sourceTransactionId: string;
  destinationTransactionId: string;
  amount: number;
  status: TransferStatus;
}

export interface TransactionRes extends Transaction {}

export interface TransactionsRes extends Array<Transaction> {}

export interface PaymentRes extends Payment {}

export interface TransferRes extends Transfer {}

export interface CreatePaymentRes {
  payment: PaymentRes;
}

export interface CreateTransferRes {
  transfer: TransferRes;
}

export interface ReadTransactionRes {
  transaction: TransactionRes;
}

export interface ReadTransactionsRes {
  transactions: TransactionsRes;
}
