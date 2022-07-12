/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VaPaidCallbackReq } from '../dtos';

export const isVaPaidCallback = (arg: any): arg is VaPaidCallbackReq => {
  return (
    arg &&
    arg.id &&
    arg.payment_id &&
    arg.callback_virtual_account_id &&
    arg.owner_id &&
    arg.external_id &&
    arg.merchant_code &&
    arg.account_number &&
    arg.bank_code &&
    arg.amount &&
    arg.transaction_timestamp &&
    arg.updated &&
    arg.created
  );
};
