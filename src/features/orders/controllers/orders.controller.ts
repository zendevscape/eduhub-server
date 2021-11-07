import { Controller } from '@nestjs/common';
import { OrdersService } from '../services';

@Controller('orders')
export class OrdersController {
  public constructor(private readonly ordersService: OrdersService) {}

  // TODO: add routes handler.
}
