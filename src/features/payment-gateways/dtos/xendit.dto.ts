export interface VaPaidCallbackReq {
  id: string;
  payment_id: string;
  callback_virtual_account_id: string;
  owner_id: string;
  external_id: string;
  merchant_code: string;
  account_number: string;
  bank_code: string;
  amount: number;
  transaction_timestamp: Date;
  updated: Date;
  created: Date;
}
