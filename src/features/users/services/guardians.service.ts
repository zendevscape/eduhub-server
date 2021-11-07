import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../../../core';
import { Guardian } from '../entities';
import {
  CreateGuardianBodyReq,
  DeleteUserBodyReq,
  DeleteUserParamsReq,
  GuardianRes,
  ReadUserParamsReq,
  UpdateGuardianBodyReq,
  UpdateUserParamsReq,
} from '../dtos';

@Injectable()
export class GuardiansService {
  public constructor(
    private readonly passwordService: PasswordService,

    @InjectRepository(Guardian)
    private readonly guardiansRepository: Repository<Guardian>,
  ) {}

  public async createGuardians(guardians: CreateGuardianBodyReq[]): Promise<GuardianRes[]> {
    const results = await this.guardiansRepository.save(
      await Promise.all(
        guardians.map(async (guardian) => {
          return this.guardiansRepository.create({
            ...guardian,
            password: await this.passwordService.hash(guardian.password),
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

  public async readGuardian(guardian: ReadUserParamsReq): Promise<GuardianRes> {
    const result = await this.guardiansRepository.findOneOrFail(guardian.id);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async readGuardians(): Promise<GuardianRes[]> {
    const results = await this.guardiansRepository.find();

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

  public async updateGuardian(
    guardian: UpdateUserParamsReq,
    newGuardian: UpdateGuardianBodyReq,
  ): Promise<GuardianRes> {
    const oldGuardian = await this.guardiansRepository.findOneOrFail({
      id: guardian.id,
    });

    const result = await this.guardiansRepository.save(
      this.guardiansRepository.create({
        ...oldGuardian,
        ...newGuardian,
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

  public async updateGuardians(guardians: UpdateGuardianBodyReq[]): Promise<GuardianRes[]> {
    const results = await this.guardiansRepository.save(
      await Promise.all(
        guardians.map(async (guardian) => {
          const oldGuardian = await this.guardiansRepository.findOneOrFail({
            id: guardian.id,
          });

          return this.guardiansRepository.create({
            ...oldGuardian,
            ...guardian,
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

  public async deleteGuardian(guardian: DeleteUserParamsReq): Promise<void> {
    await this.guardiansRepository.remove(
      await this.guardiansRepository.findOneOrFail({
        id: guardian.id,
      }),
    );
  }

  public async deleteGuardians(guardians: DeleteUserBodyReq[]): Promise<void> {
    await this.guardiansRepository.remove(
      await Promise.all(
        guardians.map(async (guardian) => {
          return await this.guardiansRepository.findOneOrFail({
            id: guardian.id,
          });
        }),
      ),
    );
  }
}
