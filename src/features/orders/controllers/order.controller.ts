import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { OrderService } from '../services';

@JsonController('/orders')
@Service()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/')
  getOrders() {
    return;
  }

  // TODO: add more endpoint.
}
