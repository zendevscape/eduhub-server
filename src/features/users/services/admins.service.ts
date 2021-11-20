import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../../../core/services';
import { Admin } from '../entities';
import {
  AdminRes,
  AdminsRes,
  CreateAdminsBodyReq,
  DeleteAdminParamsReq,
  DeleteAdminsBodyReq,
  ReadAdminParamsReq,
  UpdateAdminBodyReq,
  UpdateAdminParamsReq,
  UpdateAdminsBodyReq,
} from '../dtos';

@Injectable()
export class AdminsService {
  public constructor(
    private readonly passwordService: PasswordService,

    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
  ) {}

  public async createAdmins(admins: CreateAdminsBodyReq): Promise<AdminsRes> {
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
        created: result.created,
        updated: result.updated,
      };
    });
  }

  public async readAdmin(id: ReadAdminParamsReq): Promise<AdminRes> {
    const result = await this.adminsRepository.findOneOrFail(id.adminId);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      created: result.created,
      updated: result.updated,
    };
  }

  public async readAdmins(): Promise<AdminsRes> {
    const results = await this.adminsRepository.find();

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        created: result.created,
        updated: result.updated,
      };
    });
  }

  public async updateAdmin(id: UpdateAdminParamsReq, admin: UpdateAdminBodyReq): Promise<AdminRes> {
    const oldAdmin = await this.adminsRepository.findOneOrFail(id.adminId);

    const result = await this.adminsRepository.save(
      this.adminsRepository.create({
        ...oldAdmin,
        ...admin,
      }),
    );

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      created: result.created,
      updated: result.updated,
    };
  }

  public async updateAdmins(admins: UpdateAdminsBodyReq): Promise<AdminsRes> {
    const results = await this.adminsRepository.save(
      await Promise.all(
        admins.map(async (admin) => {
          const oldAdmin = await this.adminsRepository.findOneOrFail(admin.id);

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
        created: result.created,
        updated: result.updated,
      };
    });
  }

  public async deleteAdmin(id: DeleteAdminParamsReq): Promise<void> {
    await this.adminsRepository.remove(await this.adminsRepository.findOneOrFail(id.adminId));
  }

  public async deleteAdmins(admins: DeleteAdminsBodyReq): Promise<void> {
    await this.adminsRepository.remove(
      await Promise.all(
        admins.map(async (admin) => {
          return await this.adminsRepository.findOneOrFail(admin.id);
        }),
      ),
    );
  }
}
