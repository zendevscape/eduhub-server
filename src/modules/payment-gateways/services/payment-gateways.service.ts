import { CreatePaymentReq, PaymentRes, ReceiveCallbacksReq } from '../dtos';

export abstract class PaymentGatewaysService {
  public abstract createPayment(payment: CreatePaymentReq): Promise<PaymentRes>;

  public abstract receiveCallbacks(
    headers: ReceiveCallbacksReq,
    body: ReceiveCallbacksReq,
  ): Promise<void>;
}
