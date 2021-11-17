import { Controller, Get, Param } from '@nestjs/common';
import { Response } from '../../../core/dtos';
import { ValidationPipe } from '../../../core/pipes';
import {
  ReadTransactionParamsReq,
  ReadTransactionRes,
  ReadTransactionsParamsReq,
  ReadTransactionsRes,
} from '../dtos';
import { TransactionsService } from '../services';
import { readTransactionSchema, readTransactionsSchema } from '../validations';

@Controller()
export class TransactionsController {
  public constructor(private readonly transactionsService: TransactionsService) {}

  @Get([
    'guardians/:guardianId/transactions',
    'sellers/:sellerId/transactions',
    'students/:studentId/transactions',
  ])
  public async readTransactions(
    @Param(new ValidationPipe(readTransactionsSchema.params))
    params: ReadTransactionsParamsReq,
  ): Promise<Response<ReadTransactionsRes>> {
    const results = await this.transactionsService.readTransactions(params);

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
    const result = await this.transactionsService.readTransaction(params);

    return {
      success: true,
      message: 'Transaction found.',
      data: {
        transaction: result,
      },
    };
  }
}
