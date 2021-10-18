import { JsonController } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { OrderItemsService } from '../services';

@Service()
@JsonController('/order-items')
export class OrderItemsController {
  constructor(
    @Inject()
    private readonly orderItemsService: OrderItemsService,
  ) {}

  // TODO: add routes handler.
}
