import { Controller } from '@nestjs/common';
import { OrderItemsService } from '../services';

@Controller('order-items')
export class OrderItemsController {
  public constructor(private readonly orderItemsService: OrderItemsService) {}

  // TODO: add routes handler.
}
