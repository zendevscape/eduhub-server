import { BadRequestException, Injectable } from '@nestjs/common';
import { Admin, Guardian, Seller, Student, User } from '../../user/entities';
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
  BalanceRes,
  CreatePaymentBodyReq,
  CreatePaymentParamsReq,
  CreateTransferBodyReq,
  CreateTransferParamsReq,
  PaymentRes,
  PaymentsRes,
  ReadBalanceParamsReq,
  ReadPaymentParamsReq,
  ReadPaymentsParamsReq,
  ReadTransactionParamsReq,
  ReadTransactionsParamsReq,
  ReadTransferParamsReq,
  ReadTransfersParamsReq,
  ReceiveCallbacksBodyReq,
  ReceiveCallbacksHeadersReq,
  TransactionRes,
  TransactionsRes,
  TransferRes,
  TransfersRes,
} from '../dtos';

@Injectable()
export class FinancesService {
  public constructor(
    private readonly paymentGatewaysService: PaymentGatewaysService,
  ) {}

  public async createPayment(
    id: CreatePaymentParamsReq,
    payment: CreatePaymentBodyReq,
  ): Promise<PaymentRes> {
    let user: User;

    if (id.adminId) {
      user = await this.adminsRepository.findOneOrFail(id.adminId, {
        relations: ['balance'],
      });
    } else if (id.guardianId) {
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

    if (id.adminId) {
      sourceUser = await this.adminsRepository.findOneOrFail(id.adminId, {
        relations: ['balance'],
      });
    } else if (id.guardianId) {
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

    const destinationAdmin = await this.adminsRepository.findOne(transfer.destinationUserId, {
      relations: ['balance'],
    });
    const destinationGuardian = await this.guardiansRepository.findOne(transfer.destinationUserId, {
      relations: ['balance'],
    });
    const destinationSeller = await this.sellersRepository.findOne(transfer.destinationUserId, {
      relations: ['balance'],
    });
    const destinationStudent = await this.studentsRepository.findOne(transfer.destinationUserId, {
      relations: ['balance'],
    });

    if (destinationAdmin) {
      destinationUser = destinationAdmin;
    } else if (destinationGuardian) {
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

  public async readBalance(id: ReadBalanceParamsReq): Promise<BalanceRes> {
    let user: User;

    if (id.adminId) {
      user = await this.adminsRepository.findOneOrFail(id.adminId, {
        relations: ['balance'],
      });
    } else if (id.guardianId) {
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
        message: 'Unknown user type',
      });
    }

    return {
      amount: user.balance.amount,
    };
  }

  public async readTransaction(id: ReadTransactionParamsReq): Promise<TransactionRes> {
    let result: Transaction;
    let user: User | undefined;

    if (id.adminId) {
      user = await this.adminsRepository.findOneOrFail(id.adminId);
    } else if (id.guardianId) {
      user = await this.guardiansRepository.findOneOrFail(id.guardianId);
    } else if (id.sellerId) {
      user = await this.sellersRepository.findOneOrFail(id.sellerId);
    } else if (id.studentId) {
      user = await this.studentsRepository.findOneOrFail(id.studentId);
    }

    if (user) {
      result = await this.transactionsRepository.findOneOrFail(id.transactionId, {
        where: { user: { id: user.id } },
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
    let user: User;

    if (id.adminId) {
      user = await this.adminsRepository.findOneOrFail(id.adminId);
    } else if (id.guardianId) {
      user = await this.guardiansRepository.findOneOrFail(id.guardianId);
    } else if (id.sellerId) {
      user = await this.sellersRepository.findOneOrFail(id.sellerId);
    } else if (id.studentId) {
      user = await this.studentsRepository.findOneOrFail(id.studentId);
    } else {
      throw new BadRequestException({
        success: false,
        message: 'Unknown user type',
      });
    }

    const results = await this.transactionsRepository.find({
      where: { user: { id: user.id } },
      relations: ['payment', 'sourceTransfer', 'destinationTransfer'],
    });

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

  public async readPayment(id: ReadPaymentParamsReq): Promise<PaymentRes> {
    let result: Payment;
    let user: User | undefined;

    if (id.adminId) {
      user = await this.adminsRepository.findOneOrFail(id.adminId);
    } else if (id.guardianId) {
      user = await this.guardiansRepository.findOneOrFail(id.guardianId);
    } else if (id.sellerId) {
      user = await this.sellersRepository.findOneOrFail(id.sellerId);
    } else if (id.studentId) {
      user = await this.studentsRepository.findOneOrFail(id.studentId);
    }

    if (user) {
      result = await this.paymentsRepository.findOneOrFail(id.paymentId, {
        where: { user: { id: user.id } },
      });
    } else {
      result = await this.paymentsRepository.findOneOrFail(id.paymentId);
    }

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

  public async readPayments(id: ReadPaymentsParamsReq): Promise<PaymentsRes> {
    let user: User;

    if (id.adminId) {
      user = await this.adminsRepository.findOneOrFail(id.adminId);
    } else if (id.guardianId) {
      user = await this.guardiansRepository.findOneOrFail(id.guardianId);
    } else if (id.sellerId) {
      user = await this.sellersRepository.findOneOrFail(id.sellerId);
    } else if (id.studentId) {
      user = await this.studentsRepository.findOneOrFail(id.studentId);
    } else {
      throw new BadRequestException({
        success: false,
        message: 'Unknown user type',
      });
    }

    const results = await this.paymentsRepository.find({
      where: { user: { id: user.id } },
    });

    return results.map((result) => {
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
    });
  }

  public async readTransfer(id: ReadTransferParamsReq): Promise<TransferRes> {
    let result: Transfer;
    let user: User | undefined;

    if (id.adminId) {
      user = await this.adminsRepository.findOneOrFail(id.adminId);
    } else if (id.guardianId) {
      user = await this.guardiansRepository.findOneOrFail(id.guardianId);
    } else if (id.sellerId) {
      user = await this.sellersRepository.findOneOrFail(id.sellerId);
    } else if (id.studentId) {
      user = await this.studentsRepository.findOneOrFail(id.studentId);
    }

    if (user) {
      result = await this.transfersRepository.findOneOrFail(id.transferId, {
        where: { sourceUser: { id: user.id } },
      });
    } else {
      result = await this.transfersRepository.findOneOrFail(id.transferId);
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

  public async readTransfers(id: ReadTransfersParamsReq): Promise<TransfersRes> {
    let user: User;

    if (id.adminId) {
      user = await this.adminsRepository.findOneOrFail(id.adminId);
    } else if (id.guardianId) {
      user = await this.guardiansRepository.findOneOrFail(id.guardianId);
    } else if (id.sellerId) {
      user = await this.sellersRepository.findOneOrFail(id.sellerId);
    } else if (id.studentId) {
      user = await this.studentsRepository.findOneOrFail(id.studentId);
    } else {
      throw new BadRequestException({
        success: false,
        message: 'Unknown user type',
      });
    }

    const results = await this.transfersRepository.find({
      where: { sourceUser: { id: user.id } },
    });

    return results.map((result) => {
      return {
        id: result.id,
        sourceUserId: result.sourceUserId,
        destinationUserId: result.destinationUserId,
        sourceTransactionId: result.sourceTransactionId,
        destinationTransactionId: result.destinationTransactionId,
        amount: result.amount,
        status: result.status,
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
