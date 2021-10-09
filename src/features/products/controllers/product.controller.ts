import { Get, JsonController, Post, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { errorHandler } from '../../errorHandler';
import { ProductService } from '../services';
import { ProductValidator } from '../validation';

@JsonController('/products')
@Service()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  async postProduct(@Req() request: any, @Res() response: any): Promise<any> {
    try {
      const productId = await this.productService.createProduct(request.body);
      return response.status(201).json({
        status: 'success',
        data: {
          productId,
        },
      });
    } catch (err) {
      return errorHandler(err, response);
    }
  }

  @Get('/')
  async getProducts(@Req() request: any, @Res() response: any): Promise<any> {
    const products = await this.productService.getProducts();
    return response.status(200).json({
      status: 'success',
      data: {
        products,
      },
    });
  }

  // TODO: add more endpoint.
}
