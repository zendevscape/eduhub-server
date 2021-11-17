import { PaymentChannelCategory, PaymentChannelCode } from '../../finances/entities';

export interface CreatePaymentReq {
  userId: string;
  userName: string;
  channelCategory: PaymentChannelCategory;
  channelCode: PaymentChannelCode;
  amount: number;
}

export interface ReceiveCallbacksReq {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface PaymentRes {
  id: string;
  userId: string;
  userName: string;
  channelCategory: PaymentChannelCategory;
  channelCode: PaymentChannelCode;
  accountNumber: string;
  amount: number;
  expirationDate: Date;
}
