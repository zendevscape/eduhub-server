import moment from 'moment';
import Xendit from 'xendit-node';
import VirtualAcc from 'xendit-node/src/va/va';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Balance,
  Payment,
  PaymentChannelCategory,
  PaymentChannelCode,
  PaymentStatus,
  Transaction,
  TransactionStatus,
} from '../../finances/entities';
import { Callback } from '../../callbacks/entities';
import { CreatePaymentReq, PaymentRes, ReceiveCallbacksReq } from '../dtos';
import { isVaPaidCallback } from '../validations';
import { PaymentGatewaysService } from './payment-gateways.service';

@Injectable()
export class XenditService extends PaymentGatewaysService {
  private readonly config: {
    apiKey: string;
    callbackToken: string;
  };
  private readonly xenditApi: {
    virtualAcc: VirtualAcc;
  };

  public constructor(
    private readonly configService: ConfigService,

    @InjectRepository(Balance)
    private readonly balancesRepository: Repository<Balance>,

    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,

    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,

    @InjectRepository(Callback)
    private readonly callbacksRepository: Repository<Callback>,

    private readonly xendit: Xendit,
  ) {
    super();
    this.config = {
      apiKey: this.configService.get<string>('XENDIT_API_KEY') as string,
      callbackToken: this.configService.get<string>('XENDIT_CALLBACK_TOKEN') as string,
    };
    this.xenditApi = {
      virtualAcc: new this.xendit.VirtualAcc({}),
    };
  }

  public async createPayment(payment: CreatePaymentReq): Promise<PaymentRes> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;

    switch (payment.channelCategory) {
      case PaymentChannelCategory.VirtualAccount: {
        const defaultVaOptions = {
          isClosed: true,
          isSingleUse: true,
          expirationDate: moment().add(1, 'days').toDate(),
        };
        let bankCode: string;

        switch (payment.channelCode) {
          case PaymentChannelCode.BCA: {
            bankCode = 'BCA';
            break;
          }
          case PaymentChannelCode.BNI: {
            bankCode = 'BNI';
            break;
          }
          case PaymentChannelCode.BRI: {
            bankCode = 'BRI';
            break;
          }
          case PaymentChannelCode.Mandiri: {
            bankCode = 'MANDIRI';
            break;
          }
          default: {
            throw new BadRequestException({
              success: false,
              message: 'Unknown payment channel code.',
            });
          }
        }

        result = await this.xenditApi.virtualAcc.createFixedVA({
          ...defaultVaOptions,
          bankCode,
          externalID: payment.userId,
          name: payment.userName,
          expectedAmt: payment.amount,
        });
        break;
      }
      default: {
        throw new BadRequestException({
          success: false,
          message: 'Unknown payment channel category.',
        });
      }
    }

    return {
      id: result.id,
      userId: result.external_id,
      userName: result.name,
      channelCategory: payment.channelCategory,
      channelCode: payment.channelCode,
      accountNumber: result.account_number,
      amount: result.expected_amount,
      expirationDate: result.expiration_date,
    };
  }

  public async receiveCallbacks(
    headers: ReceiveCallbacksReq,
    body: ReceiveCallbacksReq,
  ): Promise<void> {
    if (headers['x-callback-token'] !== this.config.callbackToken) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid callback token.',
      });
    } else if (isVaPaidCallback(body)) {
      const callback = await this.callbacksRepository.findOne({
        where: { payloadId: body.id },
      });

      if (callback) {
        throw new HttpException(
          {
            success: false,
            message: 'Callback already processed.',
          },
          HttpStatus.OK,
        );
      } else {
        const payment = await this.paymentsRepository.findOneOrFail({
          where: { externalPaymentId: body.callback_virtual_account_id },
        });

        const transaction = await this.transactionsRepository.findOneOrFail(payment.transactionId);

        await this.balancesRepository.save({
          user: { id: body.external_id },
          amount: transaction.previousBalance + transaction.amount,
        });

        await this.transactionsRepository.save({
          ...transaction,
          balance: transaction.previousBalance + transaction.amount,
          status: TransactionStatus.Success,
        });

        await this.paymentsRepository.save({
          ...payment,
          status: PaymentStatus.Success,
        });

        await this.callbacksRepository.save({
          payloadId: body.id,
          payload: JSON.stringify(body),
        });
      }
    } else {
      throw new BadRequestException({
        success: false,
        message: 'Invalid callback payload.',
      });
    }
  }
}
