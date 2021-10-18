import { JsonController } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { OrdersService } from '../services';

@Service()
@JsonController('/orders')
export class OrdersController {
  constructor(
    @Inject()
    private readonly ordersService: OrdersService,
  ) {}

  // TODO: add routes handler.
}
