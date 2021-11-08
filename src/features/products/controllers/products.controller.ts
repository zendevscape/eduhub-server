import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Response, ValidationPipe } from '../../../core';
import { ProductsService } from '../services';
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
} from '../dtos';
import {
  createProductsSchema,
  deleteProductSchema,
  deleteProductsSchema,
  readProductSchema,
  readProductsSchema,
  updateProductSchema,
  updateProductsSchema,
} from '../validations';

@Controller('products')
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}

  @Post()
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
