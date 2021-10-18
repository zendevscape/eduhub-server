import { JsonController } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { ProductsService } from '../services';

@Service()
@JsonController('/products')
export class ProductsController {
  public constructor(
    @Inject()
    private readonly productsService: ProductsService,
  ) {}

  // TODO: add routes handler.
}
