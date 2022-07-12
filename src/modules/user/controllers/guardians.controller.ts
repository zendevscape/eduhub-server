import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Response } from '../../../common/dtos';
import { ValidationPipe } from '../../../common/pipes';
import { JwtAuthGuard } from '../../auth/guards';
import { GuardiansService } from '../services';
import {
  CreateGuardiansBodyReq,
  CreateGuardiansRes,
  DeleteGuardianParamsReq,
  DeleteGuardiansBodyReq,
  ReadGuardianParamsReq,
  ReadGuardianRes,
  ReadGuardiansRes,
  UpdateGuardianBodyReq,
  UpdateGuardianParamsReq,
  UpdateGuardianRes,
  UpdateGuardiansBodyReq,
  UpdateGuardiansRes,
} from '../dtos';
import {
  createGuardiansSchema,
  deleteGuardianSchema,
  deleteGuardiansSchema,
  readGuardianSchema,
  updateGuardianSchema,
  updateGuardiansSchema,
} from '../validations';

@Controller('guardians')
export class GuardiansController {
  public constructor(private readonly guardiansService: GuardiansService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createGuardians(
    @Body(new ValidationPipe(createGuardiansSchema.body))
    body: CreateGuardiansBodyReq,
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
  @UseGuards(JwtAuthGuard)
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

  @Get(':guardianId')
  @UseGuards(JwtAuthGuard)
  public async readGuardian(
    @Param(new ValidationPipe(readGuardianSchema.params))
    params: ReadGuardianParamsReq,
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
  @UseGuards(JwtAuthGuard)
  public async updateGuardians(
    @Body(new ValidationPipe(updateGuardiansSchema.body))
    body: UpdateGuardiansBodyReq,
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

  @Patch(':guardianId')
  @UseGuards(JwtAuthGuard)
  public async updateGuardian(
    @Body(new ValidationPipe(updateGuardianSchema.body))
    body: UpdateGuardianBodyReq,
    @Param(new ValidationPipe(updateGuardianSchema.params))
    params: UpdateGuardianParamsReq,
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
  @UseGuards(JwtAuthGuard)
  public async deleteGuardians(
    @Body(new ValidationPipe(deleteGuardiansSchema.body))
    body: DeleteGuardiansBodyReq,
  ): Promise<Response<void>> {
    await this.guardiansService.deleteGuardians(body);

    return {
      success: true,
      message: 'Guardian users deleted.',
    };
  }

  @Delete(':guardianId')
  @UseGuards(JwtAuthGuard)
  public async deleteGuardian(
    @Param(new ValidationPipe(deleteGuardianSchema.params))
    params: DeleteGuardianParamsReq,
  ): Promise<Response<void>> {
    await this.guardiansService.deleteGuardian(params);

    return {
      success: true,
      message: 'Guardian user deleted.',
    };
  }
}
