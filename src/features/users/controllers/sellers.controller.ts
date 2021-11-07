import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Response, ValidationPipe } from '../../../core';
import { SellersService } from '../services';
import {
  CreateSellerBodyReq,
  CreateSellersRes,
  DeleteUserBodyReq,
  DeleteUserParamsReq,
  ReadSellerRes,
  ReadSellersRes,
  ReadUserParamsReq,
  UpdateSellerBodyReq,
  UpdateSellerRes,
  UpdateSellersRes,
  UpdateUserParamsReq,
} from '../dtos';
import {
  createSellersSchema,
  deleteUserSchema,
  deleteUsersSchema,
  readUserSchema,
  updateSellerSchema,
  updateSellersSchema,
} from '../validations';

@Controller('sellers')
export class SellersController {
  public constructor(private readonly sellersService: SellersService) {}

  @Post()
  public async createSellers(
    @Body(new ValidationPipe(createSellersSchema.body))
    body: CreateSellerBodyReq[],
  ): Promise<Response<CreateSellersRes>> {
    const results = await this.sellersService.createSellers(body);

    return {
      success: true,
      message: 'Seller users created.',
      data: {
        sellers: results,
      },
    };
  }

  @Get()
  public async readSellers(): Promise<Response<ReadSellersRes>> {
    const results = await this.sellersService.readSellers();

    return {
      success: true,
      message: results.length === 0 ? 'Seller users not found.' : 'Seller users found.',
      data: {
        sellers: results,
      },
    };
  }

  @Get(':id')
  public async readSeller(
    @Param(new ValidationPipe(readUserSchema.params))
    params: ReadUserParamsReq,
  ): Promise<Response<ReadSellerRes>> {
    const result = await this.sellersService.readSeller(params);

    return {
      success: true,
      message: 'Seller user found.',
      data: {
        seller: result,
      },
    };
  }

  @Patch()
  public async updateSellers(
    @Body(new ValidationPipe(updateSellersSchema.body))
    body: UpdateSellerBodyReq[],
  ): Promise<Response<UpdateSellersRes>> {
    const results = await this.sellersService.updateSellers(body);

    return {
      success: true,
      message: 'Seller users updated.',
      data: {
        sellers: results,
      },
    };
  }

  @Patch(':id')
  public async updateSeller(
    @Body(new ValidationPipe(updateSellerSchema.body))
    body: UpdateSellerBodyReq,
    @Param(new ValidationPipe(updateSellerSchema.params))
    params: UpdateUserParamsReq,
  ): Promise<Response<UpdateSellerRes>> {
    const result = await this.sellersService.updateSeller(params, body);

    return {
      success: true,
      message: 'Student user updated.',
      data: {
        seller: result,
      },
    };
  }

  @Delete()
  public async deleteSellers(
    @Body(new ValidationPipe(deleteUsersSchema.body))
    body: DeleteUserBodyReq[],
  ): Promise<Response<void>> {
    await this.sellersService.deleteSellers(body);

    return {
      success: true,
      message: 'Seller users deleted.',
    };
  }

  @Delete(':id')
  public async deleteSeller(
    @Param(new ValidationPipe(deleteUserSchema.params))
    params: DeleteUserParamsReq,
  ): Promise<Response<void>> {
    await this.sellersService.deleteSeller(params);

    return {
      success: true,
      message: 'Seller user deleted.',
    };
  }
}
