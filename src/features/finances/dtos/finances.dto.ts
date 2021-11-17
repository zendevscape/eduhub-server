import {
  PaymentChannelCategory,
  PaymentChannelCode,
  PaymentStatus,
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

export interface ReceiveCallbacksBodyReq {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ReceiveCallbacksHeadersReq extends ReceiveCallbacksBodyReq {}

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

export interface PaymentRes extends Payment {}

export interface TransferRes extends Transfer {}

export interface CreatePaymentRes {
  payment: PaymentRes;
}

export interface CreateTransferRes {
  transfer: TransferRes;
}
