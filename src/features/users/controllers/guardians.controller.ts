import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Response } from '../../../core/dtos';
import { ValidationPipe } from '../../../core/pipes';
import { GuardiansService } from '../services';
import {
  CreateGuardianBodyReq,
  CreateGuardiansRes,
  DeleteUserBodyReq,
  DeleteUserParamsReq,
  ReadGuardianRes,
  ReadGuardiansRes,
  ReadUserParamsReq,
  UpdateGuardianBodyReq,
  UpdateGuardianRes,
  UpdateGuardiansRes,
  UpdateUserParamsReq,
} from '../dtos';
import {
  createGuardiansSchema,
  deleteUserSchema,
  deleteUsersSchema,
  readUserSchema,
  updateGuardianSchema,
  updateGuardiansSchema,
} from '../validations';

@Controller('guardians')
export class GuardiansController {
  public constructor(private readonly guardiansService: GuardiansService) {}

  @Post()
  public async createGuardians(
    @Body(new ValidationPipe(createGuardiansSchema.body))
    body: CreateGuardianBodyReq[],
  ): Promise<Response<CreateGuardiansRes>> {
    const results = await this.guardiansService.createGuardians(body);

    return {
      success: true,
      message: 'Guardian users created.',
      data: {
        guardians: results,
      },
    };
  }

  @Get()
  public async readGuardians(): Promise<Response<ReadGuardiansRes>> {
    const results = await this.guardiansService.readGuardians();

    return {
      success: true,
      message: results.length === 0 ? 'Guardian users not found.' : 'Guardian users found.',
      data: {
        guardians: results,
      },
    };
  }

  @Get(':id')
  public async readGuardian(
    @Param(new ValidationPipe(readUserSchema.params))
    params: ReadUserParamsReq,
  ): Promise<Response<ReadGuardianRes>> {
    const result = await this.guardiansService.readGuardian(params);

    return {
      success: true,
      message: 'Guardian user found.',
      data: {
        guardian: result,
      },
    };
  }

  @Patch()
  public async updateGuardians(
    @Body(new ValidationPipe(updateGuardiansSchema.body))
    body: UpdateGuardianBodyReq[],
  ): Promise<Response<UpdateGuardiansRes>> {
    const results = await this.guardiansService.updateGuardians(body);

    return {
      success: true,
      message: 'Guardian users updated.',
      data: {
        guardians: results,
      },
    };
  }

  @Patch(':id')
  public async updateGuardian(
    @Body(new ValidationPipe(updateGuardianSchema.body))
    body: UpdateGuardianBodyReq,
    @Param(new ValidationPipe(updateGuardianSchema.params))
    params: UpdateUserParamsReq,
  ): Promise<Response<UpdateGuardianRes>> {
    const result = await this.guardiansService.updateGuardian(params, body);

    return {
      success: true,
      message: 'Guardian user updated.',
      data: {
        guardian: result,
      },
    };
  }

  @Delete()
  public async deleteGuardians(
    @Body(new ValidationPipe(deleteUsersSchema.body))
    body: DeleteUserBodyReq[],
  ): Promise<Response<void>> {
    await this.guardiansService.deleteGuardians(body);

    return {
      success: true,
      message: 'Guardian users deleted.',
    };
  }

  @Delete(':id')
  public async deleteGuardian(
    @Param(new ValidationPipe(deleteUserSchema.params))
    params: DeleteUserParamsReq,
  ): Promise<Response<void>> {
    await this.guardiansService.deleteGuardian(params);

    return {
      success: true,
      message: 'Guardian user deleted.',
    };
  }
}
