import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../../../core/services';
import { Admin } from '../entities';
import {
  AdminRes,
  CreateAdminBodyReq,
  DeleteUserBodyReq,
  DeleteUserParamsReq,
  ReadUserParamsReq,
  UpdateAdminBodyReq,
  UpdateUserParamsReq,
} from '../dtos';

@Injectable()
export class AdminsService {
  public constructor(
    private readonly passwordService: PasswordService,

    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
  ) {}

  public async createAdmins(admins: CreateAdminBodyReq[]): Promise<AdminRes[]> {
    const results = await this.adminsRepository.save(
      await Promise.all(
        admins.map(async (admin) => {
          return this.adminsRepository.create({
            ...admin,
            password: await this.passwordService.hash(admin.password),
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

  public async readAdmin(admin: ReadUserParamsReq): Promise<AdminRes> {
    const result = await this.adminsRepository.findOneOrFail(admin.id);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async readAdmins(): Promise<AdminRes[]> {
    const results = await this.adminsRepository.find();

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

  public async updateAdmin(
    admin: UpdateUserParamsReq,
    newAdmin: UpdateAdminBodyReq,
  ): Promise<AdminRes> {
    const oldAdmin = await this.adminsRepository.findOneOrFail({
      id: admin.id,
    });

    const result = await this.adminsRepository.save(
      this.adminsRepository.create({
        ...oldAdmin,
        ...newAdmin,
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

  public async updateAdmins(admins: UpdateAdminBodyReq[]): Promise<AdminRes[]> {
    const results = await this.adminsRepository.save(
      await Promise.all(
        admins.map(async (admin) => {
          const oldAdmin = await this.adminsRepository.findOneOrFail({
            id: admin.id,
          });

          return this.adminsRepository.create({
            ...oldAdmin,
            ...admin,
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

  public async deleteAdmin(admin: DeleteUserParamsReq): Promise<void> {
    await this.adminsRepository.remove(
      await this.adminsRepository.findOneOrFail({
        id: admin.id,
      }),
    );
  }

  public async deleteAdmins(admins: DeleteUserBodyReq[]): Promise<void> {
    await this.adminsRepository.remove(
      await Promise.all(
        admins.map(async (admin) => {
          return await this.adminsRepository.findOneOrFail({
            id: admin.id,
          });
        }),
      ),
    );
  }
}
