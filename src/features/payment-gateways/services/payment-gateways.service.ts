import { CreatePaymentReq, PaymentRes, ReceiveCallbacksReq } from '../dtos';

export abstract class PaymentGatewaysService {
  abstract createPayment(payment: CreatePaymentReq): Promise<PaymentRes>;

  abstract receiveCallbacks(headers: ReceiveCallbacksReq, body: ReceiveCallbacksReq): Promise<void>;
}
