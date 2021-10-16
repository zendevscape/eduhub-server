import { celebrate, Modes } from 'celebrate';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Patch,
  Post,
  UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from '../../../core/types';
import { ProductService } from '../services';
import {
  CreateProductsReq,
  UpdateProductByIdReq,
  ProductsRes,
  ProductRes,
  DeleteProductsReq,
} from '../types';
import {
  CreateProductsSchema,
  DeleteProductByIdSchema,
  ReadProductByIdSchema,
  UpdateProductByIdSchema,
} from '../validation';

@JsonController('/products')
@Service()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  @HttpCode(201)
  @UseBefore(celebrate(CreateProductsSchema, {}, { mode: Modes.FULL }))
  async postProduct(
    @Body()
    body: CreateProductsReq[],
  ): Promise<Response<ProductsRes>> {
    const products = await this.productService.createProduct(body);
    return {
      success: true,
      message: 'Product added successfully',
      data: {
        products,
      },
    };
  }

  @Get('/')
  @HttpCode(200)
  async getProducts(): Promise<Response<ProductsRes>> {
    const products = await this.productService.getProducts();
    return {
      success: true,
      data: {
        products,
      },
    };
  }

  @Get('/:id')
  @HttpCode(200)
  @UseBefore(celebrate(ReadProductByIdSchema, {}, {}))
  async getProductById(
    @Param('id')
    id: string,
  ): Promise<Response<ProductRes>> {
    const product = await this.productService.getProductById(id);
    return {
      success: true,
      data: {
        product,
      },
    };
  }

  @Patch('/:id/')
  @HttpCode(200)
  @UseBefore(celebrate(UpdateProductByIdSchema, {}, { mode: Modes.FULL }))
  async updateProductById(
    @Param('id')
    id: string,
    @Body()
    body: UpdateProductByIdReq,
  ): Promise<Response<ProductRes>> {
    const product = await this.productService.updateProductById(id, body);

    return {
      success: true,
      message: 'Product updated successfully',
      data: {
        product,
      },
    };
  }

  @Delete('/:id/')
  @HttpCode(200)
  @UseBefore(celebrate(DeleteProductByIdSchema, {}, { mode: Modes.FULL }))
  async deleteProductById(
    @Param('id')
    id: string,
  ): Promise<Response<undefined>> {
    await this.productService.deleteProductById(id);
    return {
      success: true,
      message: 'Product deleted successfully',
    };
  }

  @Delete('/')
  @HttpCode(200)
  async deleteProducts(
    @Body()
    body: DeleteProductsReq[],
  ): Promise<Response<undefined>> {
    await this.productService.deleteProducts(body);
    return {
      success: true,
      message: 'Products deleted successfully',
    };
  }

  // TODO: add more endpoint.
}
