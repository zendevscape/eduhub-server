import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guardian, Seller, Student } from '../../users/entities';
import {
  ReadTransactionParamsReq,
  ReadTransactionsParamsReq,
  TransactionRes,
  TransactionsRes,
} from '../dtos';
import { Transaction } from '../entities';

@Injectable()
export class TransactionsService {
  public constructor(
    @InjectRepository(Guardian)
    private readonly guardiansRepository: Repository<Guardian>,

    @InjectRepository(Seller)
    private readonly sellersRepository: Repository<Seller>,

    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,

    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  public async readTransaction(id: ReadTransactionParamsReq): Promise<TransactionRes> {
    let result: Transaction = new Transaction();

    if (id.guardianId) {
      const guardian = await this.guardiansRepository.findOneOrFail({
        id: id.guardianId,
      });

      result = await this.transactionsRepository.findOneOrFail(id.transactionId, {
        where: { user: guardian },
        relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
      });
    } else if (id.sellerId) {
      const seller = await this.sellersRepository.findOneOrFail({
        id: id.sellerId,
      });

      result = await this.transactionsRepository.findOneOrFail(id.transactionId, {
        where: { user: seller },
        relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
      });
    } else if (id.studentId) {
      const student = await this.studentsRepository.findOneOrFail({
        id: id.studentId,
      });

      result = await this.transactionsRepository.findOneOrFail(id.transactionId, {
        where: { user: student },
        relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
      });
    } else {
      result = await this.transactionsRepository.findOneOrFail(id.transactionId, {
        relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
      });
    }

    return {
      id: result.id,
      userId: result.userId,
      type: result.type,
      amount: result.amount,
      previousBalance: result.previousBalance,
      balance: result.balance,
      note: result.note,
      payment: result.payment,
      transfer: result.sourceTransfer || result.destinationTransfer,
      status: result.status,
      created: result.created,
      updated: result.updated,
    };
  }

  public async readTransactions(id: ReadTransactionsParamsReq): Promise<TransactionsRes> {
    let results: Array<Transaction> = [];

    if (id.guardianId) {
      const guardian = await this.guardiansRepository.findOneOrFail({
        id: id.guardianId,
      });

      results = await this.transactionsRepository.find({
        where: { user: guardian },
        relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
      });
    } else if (id.sellerId) {
      const seller = await this.sellersRepository.findOneOrFail({
        id: id.sellerId,
      });

      results = await this.transactionsRepository.find({
        where: { user: seller },
        relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
      });
    } else if (id.studentId) {
      const student = await this.studentsRepository.findOneOrFail({
        id: id.studentId,
      });

      results = await this.transactionsRepository.find({
        where: { user: student },
        relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
      });
    }

    return results.map((result) => {
      return {
        id: result.id,
        userId: result.userId,
        type: result.type,
        amount: result.amount,
        previousBalance: result.previousBalance,
        balance: result.balance,
        note: result.note,
        payment: result.payment,
        transfer: result.sourceTransfer || result.destinationTransfer,
        status: result.status,
        created: result.created,
        updated: result.updated,
      };
    });
  }
}
