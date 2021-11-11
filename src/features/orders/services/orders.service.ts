import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../products';
import { Seller, Student } from '../../users';
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
  public constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(Seller)
    private readonly sellersRepository: Repository<Seller>,

    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  public async createOrders(
    id: CreateOrdersParamsReq,
    orders: CreateOrdersBodyReq,
  ): Promise<OrdersRes> {
    const results = await this.ordersRepository.save(
      await Promise.all(
        orders.map(async (order) => {
          let seller = new Seller();
          let amount = 0;
          let status = OrderStatus.Pending;
          let message = 'Orders created.';
          const stockRemainStatus: Array<boolean> = [];

          if (
            id.sellerId ||
            order.sellerId ||
            (id.sellerId && order.sellerId && id.sellerId === order.sellerId)
          ) {
            seller = await this.sellersRepository.findOneOrFail({
              id: id.sellerId || order.sellerId,
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

          const buyer = await this.studentsRepository.findOneOrFail({
            id: order.buyerId,
          });

          const orderItems = await Promise.all(
            order.orderItems.map(async (orderItem) => {
              const product = await this.productsRepository.findOneOrFail({
                id: orderItem.productId,
              });
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
          } else if (buyer.balance <= amount) {
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
            await this.studentsRepository.save({
              ...buyer,
              balance: buyer.balance - amount,
            });
            await this.sellersRepository.save({
              ...seller,
              balance: seller.balance + amount,
            });

            status = OrderStatus.Success;
          }

          return this.ordersRepository.create({
            seller,
            buyer,
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
    let seller: Seller = new Seller();
    let buyer: Student = new Student();
    let result: Order = new Order();

    if (id.sellerId) {
      seller = await this.sellersRepository.findOneOrFail({
        id: id.sellerId,
      });
    } else if (id.studentId) {
      buyer = await this.studentsRepository.findOneOrFail({
        id: id.studentId,
      });
    }

    if (seller) {
      result = await this.ordersRepository.findOneOrFail(id.orderId, {
        where: { seller },
        relations: ['orderItems'],
      });
    } else if (buyer) {
      result = await this.ordersRepository.findOneOrFail(id.orderId, {
        where: { buyer },
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
    let seller: Seller = new Seller();
    let buyer: Student = new Student();
    let results: Array<Order> = [];

    if (id.sellerId) {
      seller = await this.sellersRepository.findOneOrFail({
        id: id.sellerId,
      });
    } else if (id.studentId) {
      buyer = await this.studentsRepository.findOneOrFail({
        id: id.studentId,
      });
    }

    if (seller) {
      results = await this.ordersRepository.find({
        where: { seller },
        relations: ['orderItems'],
      });
    } else if (buyer) {
      results = await this.ordersRepository.find({
        where: { buyer },
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
