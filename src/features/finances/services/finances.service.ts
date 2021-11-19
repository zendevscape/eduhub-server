import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guardian, Seller, Student, User } from '../../users/entities';
import { PaymentGatewaysService } from '../../payment-gateways/services';
import {
  Balance,
  Payment,
  PaymentStatus,
  Transaction,
  TransactionStatus,
  TransactionType,
  Transfer,
  TransferStatus,
} from '../entities';
import {
  CreatePaymentBodyReq,
  CreatePaymentParamsReq,
  CreateTransferBodyReq,
  CreateTransferParamsReq,
  PaymentRes,
  ReadTransactionParamsReq,
  ReadTransactionsParamsReq,
  ReceiveCallbacksBodyReq,
  ReceiveCallbacksHeadersReq,
  TransactionRes,
  TransactionsRes,
  TransferRes,
} from '../dtos';

@Injectable()
export class FinancesService {
  public constructor(
    @InjectRepository(Guardian)
    private readonly guardiansRepository: Repository<Guardian>,

    @InjectRepository(Seller)
    private readonly sellersRepository: Repository<Seller>,

    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,

    @InjectRepository(Balance)
    private readonly balancesRepository: Repository<Balance>,

    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,

    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,

    @InjectRepository(Transfer)
    private readonly transfersRepository: Repository<Transfer>,

    private readonly paymentGatewaysService: PaymentGatewaysService,
  ) {}

  public async createPayment(
    id: CreatePaymentParamsReq,
    payment: CreatePaymentBodyReq,
  ): Promise<PaymentRes> {
    let user: User;

    if (id.guardianId) {
      user = await this.guardiansRepository.findOneOrFail(id.guardianId, {
        relations: ['balance'],
      });
    } else if (id.sellerId) {
      user = await this.sellersRepository.findOneOrFail(id.sellerId, {
        relations: ['balance'],
      });
    } else if (id.studentId) {
      user = await this.studentsRepository.findOneOrFail(id.studentId, {
        relations: ['balance'],
      });
    } else {
      throw new BadRequestException({
        success: false,
        message: 'Unknown user type.',
      });
    }

    const paymentApiResult = await this.paymentGatewaysService.createPayment({
      userId: user.id,
      userName: user.name,
      channelCategory: payment.channelCategory,
      channelCode: payment.channelCode,
      amount: payment.amount,
    });

    const transaction = await this.transactionsRepository.save({
      user: { id: user.id },
      type: TransactionType.Credit,
      amount: payment.amount,
      previousBalance: user.balance.amount,
      balance: user.balance.amount,
      note: `Payment for user ID ${user.id}`,
      status: TransactionStatus.Pending,
    });

    const result = await this.paymentsRepository.save({
      user: { id: user.id },
      transaction: { id: transaction.id },
      externalPaymentId: paymentApiResult.id,
      userName: paymentApiResult.userName,
      channelCategory: paymentApiResult.channelCategory,
      channelCode: paymentApiResult.channelCode,
      accountNumber: paymentApiResult.accountNumber,
      amount: paymentApiResult.amount,
      expirationDate: paymentApiResult.expirationDate,
      status: PaymentStatus.Pending,
    });

    return {
      id: result.id,
      externalPaymentId: result.externalPaymentId,
      userId: result.userId,
      userName: result.userName,
      transactionId: result.transactionId,
      channelCategory: result.channelCategory,
      channelCode: result.channelCode,
      accountNumber: result.accountNumber,
      amount: result.amount,
      expirationDate: result.expirationDate,
      status: result.status,
    };
  }

  public async createTransfer(
    id: CreateTransferParamsReq,
    transfer: CreateTransferBodyReq,
  ): Promise<TransferRes> {
    let sourceUser: User;
    let destinationUser: User;
    let result: Transfer;

    if (id.guardianId) {
      sourceUser = await this.guardiansRepository.findOneOrFail(id.guardianId, {
        relations: ['balance'],
      });
    } else if (id.sellerId) {
      sourceUser = await this.sellersRepository.findOneOrFail(id.sellerId, {
        relations: ['balance'],
      });
    } else if (id.studentId) {
      sourceUser = await this.studentsRepository.findOneOrFail(id.studentId, {
        relations: ['balance'],
      });
    } else {
      throw new BadRequestException({
        success: false,
        message: 'Unknown user type.',
      });
    }

    const destinationGuardian = await this.guardiansRepository.findOne(transfer.destinationUserId, {
      relations: ['balance'],
    });
    const destinationSeller = await this.sellersRepository.findOne(transfer.destinationUserId, {
      relations: ['balance'],
    });
    const destinationStudent = await this.studentsRepository.findOne(transfer.destinationUserId, {
      relations: ['balance'],
    });

    if (destinationGuardian) {
      destinationUser = destinationGuardian;
    } else if (destinationSeller) {
      destinationUser = destinationSeller;
    } else if (destinationStudent) {
      destinationUser = destinationStudent;
    } else {
      throw new BadRequestException({
        success: false,
        message: 'Destination user not found.',
      });
    }

    if (sourceUser.balance.amount < transfer.amount) {
      const sourceTransaction = await this.transactionsRepository.save({
        user: { id: sourceUser.id },
        type: TransactionType.Debit,
        amount: transfer.amount,
        previousBalance: sourceUser.balance.amount,
        balance: sourceUser.balance.amount,
        note: `Transfer to user ID ${destinationUser.id}`,
        status: TransactionStatus.Failed,
      });

      result = await this.transfersRepository.save({
        sourceUser: { id: sourceUser.id },
        destinationUser: { id: destinationUser.id },
        sourceTransaction: { id: sourceTransaction.id },
        amount: transfer.amount,
        status: TransferStatus.Failed,
      });
    } else {
      await this.balancesRepository.save([
        {
          user: { id: sourceUser.id },
          amount: sourceUser.balance.amount - transfer.amount,
        },
        {
          user: { id: destinationUser.id },
          amount: destinationUser.balance.amount + transfer.amount,
        },
      ]);

      const sourceTransaction = await this.transactionsRepository.save({
        user: { id: sourceUser.id },
        note: `Transfer to user ID ${destinationUser.id}`,
        type: TransactionType.Debit,
        amount: transfer.amount,
        previousBalance: sourceUser.balance.amount,
        balance: sourceUser.balance.amount - transfer.amount,
        status: TransactionStatus.Success,
      });

      const destinationTransaction = await this.transactionsRepository.save({
        user: { id: destinationUser.id },
        note: `Transfer from user ID ${sourceUser.id}`,
        type: TransactionType.Credit,
        amount: transfer.amount,
        previousBalance: destinationUser.balance.amount,
        balance: destinationUser.balance.amount + transfer.amount,
        status: TransactionStatus.Success,
      });

      result = await this.transfersRepository.save({
        sourceUser: { id: sourceUser.id },
        destinationUser: { id: destinationUser.id },
        sourceTransaction: { id: sourceTransaction.id },
        destinationTransaction: { id: destinationTransaction.id },
        amount: transfer.amount,
        status: TransferStatus.Success,
      });
    }

    return {
      id: result.id,
      sourceUserId: result.sourceUserId,
      destinationUserId: result.destinationUserId,
      sourceTransactionId: result.sourceTransactionId,
      destinationTransactionId: result.destinationTransactionId,
      amount: result.amount,
      status: result.status,
    };
  }

  public async readTransaction(id: ReadTransactionParamsReq): Promise<TransactionRes> {
    let result: Transaction = new Transaction();

    if (id.guardianId) {
      const guardian = await this.guardiansRepository.findOneOrFail(id.guardianId);

      result = await this.transactionsRepository.findOneOrFail(id.transactionId, {
        where: { user: { id: guardian.id } },
        relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
      });
    } else if (id.sellerId) {
      const seller = await this.sellersRepository.findOneOrFail(id.sellerId);

      result = await this.transactionsRepository.findOneOrFail(id.transactionId, {
        where: { user: { id: seller.id } },
        relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
      });
    } else if (id.studentId) {
      const student = await this.studentsRepository.findOneOrFail(id.studentId);

      result = await this.transactionsRepository.findOneOrFail(id.transactionId, {
        where: { user: { id: student.id } },
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
      const guardian = await this.guardiansRepository.findOneOrFail(id.guardianId);

      results = await this.transactionsRepository.find({
        where: { user: { id: guardian.id } },
        relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
      });
    } else if (id.sellerId) {
      const seller = await this.sellersRepository.findOneOrFail(id.sellerId);

      results = await this.transactionsRepository.find({
        where: { user: { id: seller.id } },
        relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
      });
    } else if (id.studentId) {
      const student = await this.studentsRepository.findOneOrFail(id.studentId);

      results = await this.transactionsRepository.find({
        where: { user: { id: student.id } },
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

  public async receiveCallbacks(
    headers: ReceiveCallbacksHeadersReq,
    body: ReceiveCallbacksBodyReq,
  ): Promise<void> {
    await this.paymentGatewaysService.receiveCallbacks(headers, body);
  }
}
