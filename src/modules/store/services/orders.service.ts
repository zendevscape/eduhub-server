import { v4 as uuidv4 } from 'uuid';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Seller, Student } from '../../user/entities';
import {
  Balance,
  Transaction,
  TransactionStatus,
  TransactionType,
  Transfer,
  TransferStatus,
} from '../../finance/entities';
import { Product } from '../../products/entities';
import { Order, OrderItem, OrderStatus } from '../entities';
import {
  CreateOrdersBodyReq,
  CreateOrdersParamsReq,
  OrderRes,
  OrdersRes,
  ReadOrderParamsReq,
  ReadOrdersParamsReq,
} from '../dtos';

@Injectable()
export class OrdersService {
  public constructor() {}

  public async createOrders(
    id: CreateOrdersParamsReq,
    orders: CreateOrdersBodyReq,
  ): Promise<OrdersRes> {
    const results = await this.ordersRepository.save(
      await Promise.all(
        orders.map(async (order) => {
          const stockRemainStatus: Array<boolean> = [];
          const orderId = uuidv4();
          let seller = new Seller();
          let amount = 0;
          let status = OrderStatus.Pending;
          let message = 'Orders created.';

          if (
            id.sellerId ||
            order.sellerId ||
            (id.sellerId && order.sellerId && id.sellerId === order.sellerId)
          ) {
            seller = await this.sellersRepository.findOneOrFail(id.sellerId || order.sellerId, {
              relations: ['balance'],
            });
          } else {
            throw new BadRequestException({
              success: false,
              message: 'Validation failed.',
              data: [
                {
                  keys: 'sellerId',
                  message: '"sellerId" is required.',
                },
              ],
            });
          }

          const buyer = await this.studentsRepository.findOneOrFail(order.buyerId, {
            relations: ['balance'],
          });

          const orderItems = await Promise.all(
            order.orderItems.map(async (orderItem) => {
              const product = await this.productsRepository.findOneOrFail(orderItem.productId);
              amount += orderItem.quantity * product.price;
              stockRemainStatus.push(product.stock >= orderItem.quantity);

              return this.orderItemsRepository.create({
                ...orderItem,
                product,
                price: product.price,
              });
            }),
          );

          if (stockRemainStatus.some((x) => x === false)) {
            status = OrderStatus.Failed;
            message = 'Products stock insufficient.';
          } else if (buyer.balance.amount < amount) {
            const sourceTransaction = await this.transactionsRepository.save({
              user: { id: buyer.id },
              note: `Payment for order ID ${orderId}`,
              type: TransactionType.Debit,
              amount,
              previousBalance: buyer.balance.amount,
              balance: buyer.balance.amount,
              status: TransactionStatus.Failed,
            });

            await this.transfersRepository.save({
              sourceUser: { id: buyer.id },
              destinationUser: { id: seller.id },
              sourceTransaction: { id: sourceTransaction.id },
              amount,
              status: TransferStatus.Failed,
            });

            status = OrderStatus.Failed;
            message = 'Buyer balance insufficient.';
          } else {
            await Promise.all(
              orderItems.map(async (orderItem) => {
                await this.productsRepository.save({
                  ...orderItem.product,
                  stock: orderItem.product.stock - orderItem.quantity,
                });
              }),
            );

            await this.balancesRepository.save([
              {
                user: { id: buyer.id },
                amount: buyer.balance.amount - amount,
              },
              {
                user: { id: seller.id },
                amount: seller.balance.amount + amount,
              },
            ]);

            const sourceTransaction = await this.transactionsRepository.save({
              user: { id: buyer.id },
              note: `Payment for order ID ${orderId}`,
              type: TransactionType.Debit,
              amount,
              previousBalance: buyer.balance.amount,
              balance: buyer.balance.amount - amount,
              status: TransactionStatus.Success,
            });

            const destinationTransaction = await this.transactionsRepository.save({
              user: { id: seller.id },
              note: `Payment for order ID ${orderId}`,
              type: TransactionType.Credit,
              amount,
              previousBalance: seller.balance.amount,
              balance: seller.balance.amount + amount,
              status: TransactionStatus.Success,
            });

            await this.transfersRepository.save({
              sourceUser: { id: buyer.id },
              destinationUser: { id: seller.id },
              sourceTransaction: { id: sourceTransaction.id },
              destinationTransaction: { id: destinationTransaction.id },
              amount: amount,
              status: TransferStatus.Success,
            });

            status = OrderStatus.Success;
          }

          return this.ordersRepository.create({
            id: orderId,
            seller: { id: seller.id },
            buyer: { id: buyer.id },
            amount,
            status,
            message,
            orderItems,
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        sellerId: result.sellerId,
        buyerId: result.buyerId,
        date: result.date,
        status: result.status,
        message: result.message,
        amount: result.amount,
        orderItems: result.orderItems.map((orderItem) => {
          return {
            id: orderItem.id,
            productId: orderItem.productId,
            quantity: orderItem.quantity,
            price: orderItem.price,
          };
        }),
      };
    });
  }

  public async readOrder(id: ReadOrderParamsReq): Promise<OrderRes> {
    let result: Order = new Order();

    if (id.sellerId) {
      const seller = await this.sellersRepository.findOneOrFail(id.sellerId);

      result = await this.ordersRepository.findOneOrFail(id.orderId, {
        where: { seller: { id: seller.id } },
        relations: ['orderItems'],
      });
    } else if (id.studentId) {
      const buyer = await this.studentsRepository.findOneOrFail(id.studentId);

      result = await this.ordersRepository.findOneOrFail(id.orderId, {
        where: { buyer: { id: buyer.id } },
        relations: ['orderItems'],
      });
    } else {
      result = await this.ordersRepository.findOneOrFail(id.orderId, {
        relations: ['orderItems'],
      });
    }

    return {
      id: result.id,
      sellerId: result.sellerId,
      buyerId: result.buyerId,
      date: result.date,
      status: result.status,
      message: result.message,
      amount: result.amount,
      orderItems: result.orderItems.map((orderItem) => {
        return {
          id: orderItem.id,
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          price: orderItem.price,
        };
      }),
    };
  }

  public async readOrders(id: ReadOrdersParamsReq): Promise<OrdersRes> {
    let results: Array<Order> = [];

    if (id.sellerId) {
      const seller = await this.sellersRepository.findOneOrFail(id.sellerId);

      results = await this.ordersRepository.find({
        where: { seller: { id: seller.id } },
        relations: ['orderItems'],
      });
    } else if (id.studentId) {
      const buyer = await this.studentsRepository.findOneOrFail(id.studentId);

      results = await this.ordersRepository.find({
        where: { buyer: { id: buyer.id } },
        relations: ['orderItems'],
      });
    }

    return results.map((result) => {
      return {
        id: result.id,
        sellerId: result.sellerId,
        buyerId: result.buyerId,
        date: result.date,
        status: result.status,
        message: result.message,
        amount: result.amount,
        orderItems: result.orderItems.map((orderItem) => {
          return {
            id: orderItem.id,
            productId: orderItem.productId,
            quantity: orderItem.quantity,
            price: orderItem.price,
          };
        }),
      };
    });
  }
}
