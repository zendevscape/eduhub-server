import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { OrderItemService } from '../services';

@JsonController('/order-items')
@Service()
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get('/')
  getOrderItems() {
    return;
  }

  // TODO: add more endpoint.
}
