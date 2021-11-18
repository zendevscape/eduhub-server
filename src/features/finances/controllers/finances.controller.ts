import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { Response } from '../../../core/dtos';
import { ValidationPipe } from '../../../core/pipes';
import {
  CreatePaymentBodyReq,
  CreatePaymentParamsReq,
  CreatePaymentRes,
  CreateTransferBodyReq,
  CreateTransferParamsReq,
  CreateTransferRes,
  ReadTransactionParamsReq,
  ReadTransactionRes,
  ReadTransactionsParamsReq,
  ReadTransactionsRes,
  ReceiveCallbacksBodyReq,
  ReceiveCallbacksHeadersReq,
} from '../dtos';
import { FinancesService } from '../services';
import { createPaymentSchema, createTransferSchema, readTransactionSchema, readTransactionsSchema } from '../validations';

@Controller()
export class FinancesController {
  public constructor(private readonly financesService: FinancesService) {}

  @Post([
    'guardians/:guardianId/payments',
    'sellers/:sellerId/payments',
    'students/:studentId/payments',
  ])
  public async createPayment(
    @Body(new ValidationPipe(createPaymentSchema.body))
    body: CreatePaymentBodyReq,
    @Param(new ValidationPipe(createPaymentSchema.params))
    params: CreatePaymentParamsReq,
  ): Promise<Response<CreatePaymentRes>> {
    const result = await this.financesService.createPayment(params, body);

    return {
      success: true,
      message: 'Payment request created.',
      data: {
        payment: result,
      },
    };
  }

  @Post([
    'guardians/:guardianId/transfers',
    'sellers/:sellerId/transfers',
    'students/:studentId/transfers',
  ])
  public async createTransfer(
    @Body(new ValidationPipe(createTransferSchema.body))
    body: CreateTransferBodyReq,
    @Param(new ValidationPipe(createTransferSchema.params))
    params: CreateTransferParamsReq,
  ): Promise<Response<CreateTransferRes>> {
    const result = await this.financesService.createTransfer(params, body);

    return {
      success: true,
      message: 'Transfer created.',
      data: {
        transfer: result,
      },
    };
  }

  @Post(['callbacks/finances'])
  public async receiveCallbacks(
    @Headers()
    headers: ReceiveCallbacksHeadersReq,
    @Body()
    body: ReceiveCallbacksBodyReq,
  ): Promise<Response<void>> {
    await this.financesService.receiveCallbacks(headers, body);

    return {
      success: true,
      message: 'Callback received.',
    };
  }

  @Get([
    'guardians/:guardianId/transactions',
    'sellers/:sellerId/transactions',
    'students/:studentId/transactions',
  ])
  public async readTransactions(
    @Param(new ValidationPipe(readTransactionsSchema.params))
    params: ReadTransactionsParamsReq,
  ): Promise<Response<ReadTransactionsRes>> {
    const results = await this.financesService.readTransactions(params);

    return {
      success: true,
      message: results.length === 0 ? 'Transactions not found.' : 'Transactions found.',
      data: {
        transactions: results,
      },
    };
  }

  @Get([
    'transactions/:transactionId',
    'guardians/:guardianId/transactions/:transactionId',
    'sellers/:sellerId/transactions/:transactionId',
    'students/:studentId/transactions/:transactionId',
  ])
  public async readTransaction(
    @Param(new ValidationPipe(readTransactionSchema.params))
    params: ReadTransactionParamsReq,
  ): Promise<Response<ReadTransactionRes>> {
    const result = await this.financesService.readTransaction(params);

    return {
      success: true,
      message: 'Transaction found.',
      data: {
        transaction: result,
      },
    };
  }
}
