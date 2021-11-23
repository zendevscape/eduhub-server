import { Body, Controller, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { Response } from '../../../core/dtos';
import { ValidationPipe } from '../../../core/pipes';
import { JwtAuthGuard } from '../../auth/guards';
import {
  CreatePaymentBodyReq,
  CreatePaymentParamsReq,
  CreatePaymentRes,
  CreateTransferBodyReq,
  CreateTransferParamsReq,
  CreateTransferRes,
  ReadBalanceParamsReq,
  ReadBalanceRes,
  ReadPaymentParamsReq,
  ReadPaymentRes,
  ReadPaymentsParamsReq,
  ReadPaymentsRes,
  ReadTransactionParamsReq,
  ReadTransactionRes,
  ReadTransactionsParamsReq,
  ReadTransactionsRes,
  ReadTransferParamsReq,
  ReadTransferRes,
  ReadTransfersParamsReq,
  ReadTransfersRes,
  ReceiveCallbacksBodyReq,
  ReceiveCallbacksHeadersReq,
} from '../dtos';
import { FinancesService } from '../services';
import {
  createPaymentSchema,
  createTransferSchema,
  readBalanceSchema,
  readPaymentSchema,
  readPaymentsSchema,
  readTransactionSchema,
  readTransactionsSchema,
  readTransferSchema,
  readTransfersSchema,
} from '../validations';

@Controller()
export class FinancesController {
  public constructor(private readonly financesService: FinancesService) {}

  @Post([
    'admins/:adminId/payments',
    'guardians/:guardianId/payments',
    'sellers/:sellerId/payments',
    'students/:studentId/payments',
  ])
  @UseGuards(JwtAuthGuard)
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
    'admins/:adminId/transfers',
    'guardians/:guardianId/transfers',
    'sellers/:sellerId/transfers',
    'students/:studentId/transfers',
  ])
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
    'admins/:adminId/balances',
    'guardians/:guardianId/balances',
    'sellers/:sellerId/balances',
    'students/:studentId/balances',
  ])
  @UseGuards(JwtAuthGuard)
  public async readBalance(
    @Param(new ValidationPipe(readBalanceSchema.params))
    params: ReadBalanceParamsReq,
  ): Promise<Response<ReadBalanceRes>> {
    const result = await this.financesService.readBalance(params);

    return {
      success: true,
      message: 'Balances found.',
      data: {
        balance: result,
      },
    };
  }

  @Get([
    'admins/:adminId/transactions',
    'guardians/:guardianId/transactions',
    'sellers/:sellerId/transactions',
    'students/:studentId/transactions',
  ])
  @UseGuards(JwtAuthGuard)
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
    'admins/:adminId/transactions/:transactionId',
    'guardians/:guardianId/transactions/:transactionId',
    'sellers/:sellerId/transactions/:transactionId',
    'students/:studentId/transactions/:transactionId',
  ])
  @UseGuards(JwtAuthGuard)
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

  @Get([
    'admins/:adminId/payments',
    'guardians/:guardianId/payments',
    'sellers/:sellerId/payments',
    'students/:studentId/payments',
  ])
  @UseGuards(JwtAuthGuard)
  public async readPayments(
    @Param(new ValidationPipe(readPaymentsSchema.params))
    params: ReadPaymentsParamsReq,
  ): Promise<Response<ReadPaymentsRes>> {
    const results = await this.financesService.readPayments(params);

    return {
      success: true,
      message: results.length === 0 ? 'Payments not found.' : 'Payments found.',
      data: {
        payments: results,
      },
    };
  }

  @Get([
    'payments/:paymentId',
    'admins/:adminId/payments/:paymentId',
    'guardians/:guardianId/payments/:paymentId',
    'sellers/:sellerId/payments/:paymentId',
    'students/:studentId/payments/:paymentId',
  ])
  @UseGuards(JwtAuthGuard)
  public async readPayment(
    @Param(new ValidationPipe(readPaymentSchema.params))
    params: ReadPaymentParamsReq,
  ): Promise<Response<ReadPaymentRes>> {
    const result = await this.financesService.readPayment(params);

    return {
      success: true,
      message: 'Payment found.',
      data: {
        payment: result,
      },
    };
  }

  @Get([
    'admins/:adminId/transfers',
    'guardians/:guardianId/transfers',
    'sellers/:sellerId/transfers',
    'students/:studentId/transfers',
  ])
  @UseGuards(JwtAuthGuard)
  public async readTransfers(
    @Param(new ValidationPipe(readTransfersSchema.params))
    params: ReadTransfersParamsReq,
  ): Promise<Response<ReadTransfersRes>> {
    const results = await this.financesService.readTransfers(params);

    return {
      success: true,
      message: results.length === 0 ? 'Transfers not found.' : 'Transfers found.',
      data: {
        transfers: results,
      },
    };
  }

  @Get([
    'transfers/:transferId',
    'admins/:adminId/transfers/:transferId',
    'guardians/:guardianId/transfers/:transferId',
    'sellers/:sellerId/transfers/:transferId',
    'students/:studentId/transfers/:transferId',
  ])
  @UseGuards(JwtAuthGuard)
  public async readTransfer(
    @Param(new ValidationPipe(readTransferSchema.params))
    params: ReadTransferParamsReq,
  ): Promise<Response<ReadTransferRes>> {
    const result = await this.financesService.readTransfer(params);

    return {
      success: true,
      message: 'Transfer found.',
      data: {
        transfer: result,
      },
    };
  }
}
