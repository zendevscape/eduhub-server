import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../../../core/services';
import { Seller } from '../entities';
import {
  CreateSellersBodyReq,
  DeleteSellerParamsReq,
  DeleteSellersBodyReq,
  ReadSellerParamsReq,
  SellerRes,
  SellersRes,
  UpdateSellerBodyReq,
  UpdateSellerParamsReq,
  UpdateSellersBodyReq,
} from '../dtos';

@Injectable()
export class SellersService {
  public constructor(
    private readonly passwordService: PasswordService,

    @InjectRepository(Seller)
    private readonly sellersRepository: Repository<Seller>,
  ) {}

  public async createSellers(sellers: CreateSellersBodyReq): Promise<SellersRes> {
    const results = await this.sellersRepository.save(
      await Promise.all(
        sellers.map(async (seller) => {
          return this.sellersRepository.create({
            ...seller,
            password: await this.passwordService.hash(seller.password),
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async readSeller(id: ReadSellerParamsReq): Promise<SellerRes> {
    const result = await this.sellersRepository.findOneOrFail(id.sellerId);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async readSellers(): Promise<SellersRes> {
    const results = await this.sellersRepository.find();

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async updateSeller(
    id: UpdateSellerParamsReq,
    seller: UpdateSellerBodyReq,
  ): Promise<SellerRes> {
    const oldSeller = await this.sellersRepository.findOneOrFail(id.sellerId);

    const result = await this.sellersRepository.save(
      this.sellersRepository.create({
        ...oldSeller,
        ...seller,
      }),
    );

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async updateSellers(sellers: UpdateSellersBodyReq): Promise<SellersRes> {
    const results = await this.sellersRepository.save(
      await Promise.all(
        sellers.map(async (seller) => {
          const oldSeller = await this.sellersRepository.findOneOrFail(seller.id);

          return this.sellersRepository.create({
            ...oldSeller,
            ...seller,
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async deleteSeller(id: DeleteSellerParamsReq): Promise<void> {
    await this.sellersRepository.remove(await this.sellersRepository.findOneOrFail(id.sellerId));
  }

  public async deleteSellers(sellers: DeleteSellersBodyReq): Promise<void> {
    await this.sellersRepository.remove(
      await Promise.all(
        sellers.map(async (seller) => {
          return await this.sellersRepository.findOneOrFail(seller.id);
        }),
      ),
    );
  }
}
