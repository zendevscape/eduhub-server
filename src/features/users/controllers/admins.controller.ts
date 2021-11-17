import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Response } from '../../../core/dtos';
import { ValidationPipe } from '../../../core/pipes';
import { AdminsService } from '../services';
import {
  CreateAdminBodyReq,
  CreateAdminsRes,
  DeleteUserBodyReq,
  DeleteUserParamsReq,
  ReadAdminRes,
  ReadAdminsRes,
  ReadUserParamsReq,
  UpdateAdminBodyReq,
  UpdateAdminRes,
  UpdateAdminsRes,
  UpdateUserParamsReq,
} from '../dtos';
import {
  createAdminsSchema,
  deleteUserSchema,
  deleteUsersSchema,
  readUserSchema,
  updateAdminSchema,
  updateAdminsSchema,
} from '../validations';

@Controller('admins')
export class AdminsController {
  public constructor(private readonly adminsService: AdminsService) {}

  @Post()
  public async createAdmins(
    @Body(new ValidationPipe(createAdminsSchema.body))
    body: CreateAdminBodyReq[],
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

  @Get(':id')
  public async readAdmin(
    @Param(new ValidationPipe(readUserSchema.params))
    params: ReadUserParamsReq,
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
  public async updateAdmins(
    @Body(new ValidationPipe(updateAdminsSchema.body))
    body: UpdateAdminBodyReq[],
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

  @Patch(':id')
  public async updateAdmin(
    @Body(new ValidationPipe(updateAdminSchema.body))
    body: UpdateAdminBodyReq,
    @Param(new ValidationPipe(updateAdminSchema.params))
    params: UpdateUserParamsReq,
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
  public async deleteAdmins(
    @Body(new ValidationPipe(deleteUsersSchema.body))
    body: DeleteUserBodyReq[],
  ): Promise<Response<void>> {
    await this.adminsService.deleteAdmins(body);

    return {
      success: true,
      message: 'Administrator users deleted.',
    };
  }

  @Delete(':id')
  public async deleteAdmin(
    @Param(new ValidationPipe(deleteUserSchema.params))
    params: DeleteUserParamsReq,
  ): Promise<Response<void>> {
    await this.adminsService.deleteAdmin(params);

    return {
      success: true,
      message: 'Administrator user deleted.',
    };
  }
}
