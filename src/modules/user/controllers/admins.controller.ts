import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Response } from '../../../common/dtos';
import { ValidationPipe } from '../../../common/pipes';
import { JwtAuthGuard } from '../../auth/guards';
import { AdminsService } from '../services';
import {
  CreateAdminsBodyReq,
  CreateAdminsRes,
  DeleteAdminParamsReq,
  DeleteAdminsBodyReq,
  ReadAdminParamsReq,
  ReadAdminRes,
  ReadAdminsRes,
  UpdateAdminBodyReq,
  UpdateAdminParamsReq,
  UpdateAdminRes,
  UpdateAdminsBodyReq,
  UpdateAdminsRes,
} from '../dtos';
import {
  createAdminsSchema,
  deleteAdminSchema,
  deleteAdminsSchema,
  readAdminSchema,
  updateAdminSchema,
  updateAdminsSchema,
} from '../validations';

@Controller('admins')
export class AdminsController {
  public constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createAdmins(
    @Body(new ValidationPipe(createAdminsSchema.body))
    body: CreateAdminsBodyReq,
  ): Promise<Response<CreateAdminsRes>> {
    const results = await this.adminsService.createAdmins(body);

    return {
      success: true,
      message: 'Administrator users created.',
      data: {
        admins: results,
      },
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async readAdmins(): Promise<Response<ReadAdminsRes>> {
    const results = await this.adminsService.readAdmins();

    return {
      success: true,
      message:
        results.length === 0 ? 'Administrator users not found.' : 'Administrator users found.',
      data: {
        admins: results,
      },
    };
  }

  @Get(':adminId')
  @UseGuards(JwtAuthGuard)
  public async readAdmin(
    @Param(new ValidationPipe(readAdminSchema.params))
    params: ReadAdminParamsReq,
  ): Promise<Response<ReadAdminRes>> {
    const result = await this.adminsService.readAdmin(params);

    return {
      success: true,
      message: 'Administrator user found.',
      data: {
        admin: result,
      },
    };
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  public async updateAdmins(
    @Body(new ValidationPipe(updateAdminsSchema.body))
    body: UpdateAdminsBodyReq,
  ): Promise<Response<UpdateAdminsRes>> {
    const results = await this.adminsService.updateAdmins(body);

    return {
      success: true,
      message: 'Administrator users updated.',
      data: {
        admins: results,
      },
    };
  }

  @Patch(':adminId')
  @UseGuards(JwtAuthGuard)
  public async updateAdmin(
    @Body(new ValidationPipe(updateAdminSchema.body))
    body: UpdateAdminBodyReq,
    @Param(new ValidationPipe(updateAdminSchema.params))
    params: UpdateAdminParamsReq,
  ): Promise<Response<UpdateAdminRes>> {
    const result = await this.adminsService.updateAdmin(params, body);

    return {
      success: true,
      message: 'Administrator user updated.',
      data: {
        admin: result,
      },
    };
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  public async deleteAdmins(
    @Body(new ValidationPipe(deleteAdminsSchema.body))
    body: DeleteAdminsBodyReq,
  ): Promise<Response<void>> {
    await this.adminsService.deleteAdmins(body);

    return {
      success: true,
      message: 'Administrator users deleted.',
    };
  }

  @Delete(':adminId')
  @UseGuards(JwtAuthGuard)
  public async deleteAdmin(
    @Param(new ValidationPipe(deleteAdminSchema.params))
    params: DeleteAdminParamsReq,
  ): Promise<Response<void>> {
    await this.adminsService.deleteAdmin(params);

    return {
      success: true,
      message: 'Administrator user deleted.',
    };
  }
}
