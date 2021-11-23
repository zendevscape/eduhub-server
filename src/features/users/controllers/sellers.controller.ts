import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Response } from '../../../core/dtos';
import { ValidationPipe } from '../../../core/pipes';
import { JwtAuthGuard } from '../../auth/guards';
import { SellersService } from '../services';
import {
  CreateSellersBodyReq,
  CreateSellersRes,
  DeleteSellerParamsReq,
  DeleteSellersBodyReq,
  ReadSellerParamsReq,
  ReadSellerRes,
  ReadSellersRes,
  UpdateSellerBodyReq,
  UpdateSellerParamsReq,
  UpdateSellerRes,
  UpdateSellersBodyReq,
  UpdateSellersRes,
} from '../dtos';
import {
  createSellersSchema,
  deleteSellerSchema,
  deleteSellersSchema,
  readSellerSchema,
  updateSellerSchema,
  updateSellersSchema,
} from '../validations';

@Controller('sellers')
export class SellersController {
  public constructor(private readonly sellersService: SellersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createSellers(
    @Body(new ValidationPipe(createSellersSchema.body))
    body: CreateSellersBodyReq,
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
  @UseGuards(JwtAuthGuard)
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

  @Get(':sellerId')
  @UseGuards(JwtAuthGuard)
  public async readSeller(
    @Param(new ValidationPipe(readSellerSchema.params))
    params: ReadSellerParamsReq,
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
  @UseGuards(JwtAuthGuard)
  public async updateSellers(
    @Body(new ValidationPipe(updateSellersSchema.body))
    body: UpdateSellersBodyReq,
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

  @Patch(':sellerId')
  @UseGuards(JwtAuthGuard)
  public async updateSeller(
    @Body(new ValidationPipe(updateSellerSchema.body))
    body: UpdateSellerBodyReq,
    @Param(new ValidationPipe(updateSellerSchema.params))
    params: UpdateSellerParamsReq,
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
  @UseGuards(JwtAuthGuard)
  public async deleteSellers(
    @Body(new ValidationPipe(deleteSellersSchema.body))
    body: DeleteSellersBodyReq,
  ): Promise<Response<void>> {
    await this.sellersService.deleteSellers(body);

    return {
      success: true,
      message: 'Seller users deleted.',
    };
  }

  @Delete(':sellerId')
  @UseGuards(JwtAuthGuard)
  public async deleteSeller(
    @Param(new ValidationPipe(deleteSellerSchema.params))
    params: DeleteSellerParamsReq,
  ): Promise<Response<void>> {
    await this.sellersService.deleteSeller(params);

    return {
      success: true,
      message: 'Seller user deleted.',
    };
  }
}
