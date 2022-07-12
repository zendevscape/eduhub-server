import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../../../common/services';
import { Guardian } from '../entities';
import {
  CreateGuardiansBodyReq,
  DeleteGuardianParamsReq,
  DeleteGuardiansBodyReq,
  GuardianRes,
  GuardiansRes,
  ReadGuardianParamsReq,
  UpdateGuardianBodyReq,
  UpdateGuardianParamsReq,
  UpdateGuardiansBodyReq,
} from '../dtos';

@Injectable()
export class GuardiansService {
  public constructor(
    private readonly passwordService: PasswordService,

    @InjectRepository(Guardian)
    private readonly guardiansRepository: Repository<Guardian>,
  ) {}

  public async createGuardians(guardians: CreateGuardiansBodyReq): Promise<GuardiansRes> {
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
        created: result.created,
        updated: result.updated,
      };
    });
  }

  public async readGuardian(id: ReadGuardianParamsReq): Promise<GuardianRes> {
    const result = await this.guardiansRepository.findOneOrFail(id.guardianId);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      created: result.created,
      updated: result.updated,
    };
  }

  public async readGuardians(): Promise<GuardianRes[]> {
    const results = await this.guardiansRepository.find();

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

  public async updateGuardian(
    id: UpdateGuardianParamsReq,
    guardian: UpdateGuardianBodyReq,
  ): Promise<GuardianRes> {
    const oldGuardian = await this.guardiansRepository.findOneOrFail(id.guardianId);

    const result = await this.guardiansRepository.save(
      this.guardiansRepository.create({
        ...oldGuardian,
        ...guardian,
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

  public async updateGuardians(guardians: UpdateGuardiansBodyReq): Promise<GuardiansRes> {
    const results = await this.guardiansRepository.save(
      await Promise.all(
        guardians.map(async (guardian) => {
          const oldGuardian = await this.guardiansRepository.findOneOrFail(guardian.id);

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
        created: result.created,
        updated: result.updated,
      };
    });
  }

  public async deleteGuardian(id: DeleteGuardianParamsReq): Promise<void> {
    await this.guardiansRepository.remove(
      await this.guardiansRepository.findOneOrFail(id.guardianId),
    );
  }

  public async deleteGuardians(guardians: DeleteGuardiansBodyReq): Promise<void> {
    await this.guardiansRepository.remove(
      await Promise.all(
        guardians.map(async (guardian) => {
          return await this.guardiansRepository.findOneOrFail(guardian.id);
        }),
      ),
    );
  }
}
