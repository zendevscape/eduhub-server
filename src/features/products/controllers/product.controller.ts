import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { ProductService } from '../services';

@JsonController('/products')
@Service()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  getProducts() {
    return;
  }

  // TODO: add more endpoint.
}
