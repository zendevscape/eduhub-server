import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Response } from '../../../common/dtos';
import { ValidationPipe } from '../../../common/pipes';
import { JwtAuthGuard } from '../../auth/guards';
import {
  CreateOrdersBodyReq,
  CreateOrdersParamsReq,
  CreateOrdersRes,
  ReadOrderParamsReq,
  ReadOrderRes,
  ReadOrdersParamsReq,
  ReadOrdersRes,
} from '../dtos';
import { OrdersService } from '../services';
import { createOrdersSchema, readOrderSchema, readOrdersSchema } from '../validations';

@Controller()
export class OrdersController {
  public constructor(private readonly ordersService: OrdersService) {}

  @Post(['orders', 'sellers/:sellerId/orders'])
  @UseGuards(JwtAuthGuard)
  public async createOrders(
    @Body(new ValidationPipe(createOrdersSchema.body))
    body: CreateOrdersBodyReq,
    @Param(new ValidationPipe(createOrdersSchema.params))
    params: CreateOrdersParamsReq,
  ): Promise<Response<CreateOrdersRes>> {
    const results = await this.ordersService.createOrders(params, body);

    return {
      success: true,
      message: 'Orders created.',
      data: {
        orders: results,
      },
    };
  }

  @Get(['sellers/:sellerId/orders', 'students/:studentId/orders'])
  @UseGuards(JwtAuthGuard)
  public async readOrders(
    @Param(new ValidationPipe(readOrdersSchema.params))
    params: ReadOrdersParamsReq,
  ): Promise<Response<ReadOrdersRes>> {
    const results = await this.ordersService.readOrders(params);

    return {
      success: true,
      message: results.length === 0 ? 'Orders not found.' : 'Orders found.',
      data: {
        orders: results,
      },
    };
  }

  @Get([
    'orders/:orderId',
    'sellers/:sellerId/orders/:orderId',
    'students/:studentId/orders/:orderId',
  ])
  @UseGuards(JwtAuthGuard)
  public async readOrder(
    @Param(new ValidationPipe(readOrderSchema.params))
    params: ReadOrderParamsReq,
  ): Promise<Response<ReadOrderRes>> {
    const result = await this.ordersService.readOrder(params);

    return {
      success: true,
      message: 'Order found.',
      data: {
        order: result,
      },
    };
  }
}
