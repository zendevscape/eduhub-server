import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Response } from '../../../common/dtos';
import { ValidationPipe } from '../../../common/pipes';
import { JwtAuthGuard } from '../../auth/guards';
import { ProductsService } from '../../products/services';
import {
  CreateProductsBodyReq,
  CreateProductsParamsReq,
  CreateProductsRes,
  DeleteProductsBodyReq,
  DeleteProductsParamsReq,
  DeleteProductParamsReq,
  ReadProductParamsReq,
  ReadProductRes,
  ReadProductsParamsReq,
  ReadProductsRes,
  UpdateProductBodyReq,
  UpdateProductParamsReq,
  UpdateProductRes,
  UpdateProductsBodyReq,
  UpdateProductsParamsReq,
  UpdateProductsRes,
} from '../../products/dtos';
import {
  createProductsSchema,
  deleteProductSchema,
  deleteProductsSchema,
  readProductSchema,
  readProductsSchema,
  updateProductSchema,
  updateProductsSchema,
} from '../../products/validations';

@Controller('sellers/:sellerId/products')
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createProduct(
    @Body(new ValidationPipe(createProductsSchema.body))
    body: CreateProductsBodyReq,
    @Param(new ValidationPipe(createProductsSchema.params))
    params: CreateProductsParamsReq,
  ): Promise<Response<CreateProductsRes>> {
    const results = await this.productsService.createProducts(params, body);

    return {
      success: true,
      message: 'Product created.',
      data: {
        products: results,
      },
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async readProducts(
    @Param(new ValidationPipe(readProductsSchema.params))
    params: ReadProductsParamsReq,
  ): Promise<Response<ReadProductsRes>> {
    const results = await this.productsService.readProducts(params);

    return {
      success: true,
      message: results.length === 0 ? 'Products not found.' : 'Products found.',
      data: {
        products: results,
      },
    };
  }

  @Get(':productId')
  @UseGuards(JwtAuthGuard)
  public async readProduct(
    @Param(new ValidationPipe(readProductSchema.params))
    params: ReadProductParamsReq,
  ): Promise<Response<ReadProductRes>> {
    const result = await this.productsService.readProduct(params);

    return {
      success: true,
      message: 'Product found.',
      data: {
        product: result,
      },
    };
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  public async updateProducts(
    @Body(new ValidationPipe(updateProductsSchema.body))
    body: UpdateProductsBodyReq,
    @Param(new ValidationPipe(updateProductsSchema.params))
    params: UpdateProductsParamsReq,
  ): Promise<Response<UpdateProductsRes>> {
    const results = await this.productsService.updateProducts(params, body);

    return {
      success: true,
      message: 'Products updated.',
      data: {
        products: results,
      },
    };
  }

  @Patch(':productId')
  @UseGuards(JwtAuthGuard)
  public async updateProduct(
    @Body(new ValidationPipe(updateProductSchema.body))
    body: UpdateProductBodyReq,
    @Param(new ValidationPipe(updateProductSchema.params))
    params: UpdateProductParamsReq,
  ): Promise<Response<UpdateProductRes>> {
    const result = await this.productsService.updateProduct(params, body);

    return {
      success: true,
      message: 'Products updated.',
      data: {
        product: result,
      },
    };
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  public async deleteProducts(
    @Body(new ValidationPipe(deleteProductsSchema.body))
    body: DeleteProductsBodyReq,
    @Param(new ValidationPipe(deleteProductsSchema.params))
    params: DeleteProductsParamsReq,
  ): Promise<Response<void>> {
    await this.productsService.deleteProducts(params, body);

    return {
      success: true,
      message: 'Products deleted.',
    };
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard)
  public async deleteProductById(
    @Param(new ValidationPipe(deleteProductSchema.params))
    params: DeleteProductParamsReq,
  ): Promise<Response<void>> {
    await this.productsService.deleteProduct(params);

    return {
      success: true,
      message: 'Product deleted.',
    };
  }
}
