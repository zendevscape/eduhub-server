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
  adminId?: string;
  guardianId?: string;
  sellerId?: string;
  studentId?: string;
}

export interface CreateTransferBodyReq {
  destinationUserId: string;
  amount: number;
}

export interface CreateTransferParamsReq extends CreatePaymentParamsReq {}

export interface ReadBalanceParamsReq extends CreatePaymentParamsReq {}

export interface ReadTransactionParamsReq extends CreatePaymentParamsReq {
  transactionId: string;
}

export interface ReadTransactionsParamsReq extends CreatePaymentParamsReq {}

export interface ReadPaymentParamsReq extends CreatePaymentParamsReq {
  paymentId: string;
}

export interface ReadPaymentsParamsReq extends CreatePaymentParamsReq {}

export interface ReadTransferParamsReq extends CreatePaymentParamsReq {
  transferId: string;
}

export interface ReadTransfersParamsReq extends CreatePaymentParamsReq {}

export interface ReceiveCallbacksBodyReq {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ReceiveCallbacksHeadersReq extends ReceiveCallbacksBodyReq {}

interface Balance {
  amount: number;
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

export interface BalanceRes extends Balance {}

export interface TransactionRes extends Transaction {}

export interface TransactionsRes extends Array<Transaction> {}

export interface PaymentRes extends Payment {}

export interface PaymentsRes extends Array<Payment> {}

export interface TransferRes extends Transfer {}

export interface TransfersRes extends Array<Transfer> {}

export interface CreatePaymentRes {
  payment: PaymentRes;
}

export interface CreateTransferRes {
  transfer: TransferRes;
}

export interface ReadBalanceRes {
  balance: BalanceRes;
}

export interface ReadTransactionRes {
  transaction: TransactionRes;
}

export interface ReadTransactionsRes {
  transactions: TransactionsRes;
}

export interface ReadPaymentRes {
  payment: PaymentRes;
}

export interface ReadPaymentsRes {
  payments: PaymentsRes;
}

export interface ReadTransferRes {
  transfer: TransferRes;
}

export interface ReadTransfersRes {
  transfers: TransfersRes;
}
