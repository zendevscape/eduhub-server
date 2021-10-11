import { Delete, Get, JsonController, Patch, Post, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { errorHandler } from '../../errorHandler';
import { ProductService } from '../services';
import { ProductValidator } from '../validation';

@JsonController('/products')
@Service()
export class ProductController {
  productValidator: any;
  constructor(private readonly productService: ProductService) {
    this.productValidator = ProductValidator;
  }

  @Post('/')
  async postProduct(@Req() request: any, @Res() response: any): Promise<any> {
    try {
      this.productValidator.validatePostProductPayloadSchema(request.body);
      const productId = await this.productService.createProduct(request.body);
      return response.status(201).json({
        status: 'success',
        message: 'Product added successfully',
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

  @Get('/:id/')
  async getProductById(@Req() request: any, @Res() response: any): Promise<any> {
    try {
      const { id } = request.params;
      this.productValidator.validateProductIdParamSchema(id);
      const product = await this.productService.getProductById(id);
      return response.status(200).json({
        status: 'success',
        data: {
          product,
        },
      });
    } catch (err) {
      return errorHandler(err, response);
    }
  }

  @Patch('/:id/')
  async updateProductById(@Req() request: any, @Res() response: any): Promise<any> {
    try {
      const { id } = request.params;
      this.productValidator.validateProductIdParamSchema(id);
      this.productValidator.validateUpdateProductPayloadSchema(request.body);
      const updatedProduct = await this.productService.updateProductById(id, request.body);

      return response.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: {
          updatedProduct,
        },
      });
    } catch (err) {
      return errorHandler(err, response);
    }
  }

  @Delete('/:id/')
  async deleteProductById(@Req() request: any, @Res() response: any): Promise<any> {
    try {
      const { id } = request.params;
      this.productValidator.validateProductIdParamSchema(id);
      await this.productService.deleteProductById(id);
      return response.json({
        status: 'success',
        message: 'Product deleted successfully',
      });
    } catch (err) {
      return errorHandler(err, response);
    }
  }

  @Delete('/')
  async deleteProducts(@Req() request: any, @Res() response: any): Promise<any> {
    try {
      this.productValidator.validateDeleteProductsPayloadSchema(request.body);
      await this.productService.deleteProducts(request.body);
      return response.status(200).json({
        status: 'success',
        message: 'Products deleted successfully',
      });
    } catch (err) {
      return errorHandler(err, response);
    }
  }

  // TODO: add more endpoint.
}
