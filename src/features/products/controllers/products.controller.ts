import { Controller } from '@nestjs/common';
import { ProductsService } from '../services';

@Controller('products')
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}

  // TODO: add routes handler.
}
