import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../../../core/services';
import { Seller } from '../entities';
import {
  CreateSellerBodyReq,
  DeleteUserBodyReq,
  DeleteUserParamsReq,
  ReadUserParamsReq,
  SellerRes,
  UpdateSellerBodyReq,
  UpdateUserParamsReq,
} from '../dtos';

@Injectable()
export class SellersService {
  public constructor(
    private readonly passwordService: PasswordService,

    @InjectRepository(Seller)
    private readonly sellersRepository: Repository<Seller>,
  ) {}

  public async createSellers(sellers: CreateSellerBodyReq[]): Promise<SellerRes[]> {
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

  public async readSeller(seller: ReadUserParamsReq): Promise<SellerRes> {
    const result = await this.sellersRepository.findOneOrFail(seller.id);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async readSellers(): Promise<SellerRes[]> {
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
    seller: UpdateUserParamsReq,
    newSeller: UpdateSellerBodyReq,
  ): Promise<SellerRes> {
    const oldSeller = await this.sellersRepository.findOneOrFail(seller.id);

    const result = await this.sellersRepository.save(
      this.sellersRepository.create({
        ...oldSeller,
        ...newSeller,
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

  public async updateSellers(sellers: UpdateSellerBodyReq[]): Promise<SellerRes[]> {
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

  public async deleteSeller(seller: DeleteUserParamsReq): Promise<void> {
    await this.sellersRepository.remove(await this.sellersRepository.findOneOrFail(seller.id));
  }

  public async deleteSellers(sellers: DeleteUserBodyReq[]): Promise<void> {
    await this.sellersRepository.remove(
      await Promise.all(
        sellers.map(async (seller) => {
          return await this.sellersRepository.findOneOrFail(seller.id);
        }),
      ),
    );
  }
}
