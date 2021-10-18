import { celebrate, Modes } from 'celebrate';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Params,
  Patch,
  Post,
  UseBefore,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { Response } from '../../../core/types';
import { UsersService } from '../services';
import {
  CreateAdminBodyReq,
  CreateAdminsRes,
  CreateGuardianBodyReq,
  CreateGuardiansRes,
  CreateSellerBodyReq,
  CreateSellersRes,
  CreateStudentBodyReq,
  CreateStudentsRes,
  DeleteUserBodyReq,
  DeleteUserParamsReq,
  ReadAdminRes,
  ReadAdminsRes,
  ReadGuardianRes,
  ReadGuardiansRes,
  ReadSellerRes,
  ReadSellersRes,
  ReadStudentRes,
  ReadStudentsRes,
  ReadUserParamsReq,
  UpdateAdminBodyReq,
  UpdateAdminRes,
  UpdateAdminsRes,
  UpdateGuardianBodyReq,
  UpdateGuardianRes,
  UpdateGuardiansRes,
  UpdateSellerBodyReq,
  UpdateSellerRes,
  UpdateSellersRes,
  UpdateStudentBodyReq,
  UpdateStudentRes,
  UpdateStudentsRes,
  UpdateUserParamsReq,
} from '../types';
import {
  createAdminsSchema,
  createGuardiansSchema,
  createSellersSchema,
  createStudentsSchema,
  deleteUserSchema,
  deleteUsersSchema,
  readUserSchema,
  updateAdminSchema,
  updateAdminsSchema,
  updateGuardianSchema,
  updateGuardiansSchema,
  updateSellerSchema,
  updateSellersSchema,
  updateStudentSchema,
  updateStudentsSchema,
} from '../validations';

@Service()
@JsonController()
export class UsersController {
  public constructor(
    @Inject()
    private readonly usersService: UsersService,
  ) {}

  @Post('/admins')
  @HttpCode(201)
  @UseBefore(celebrate(createAdminsSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async createAdmins(
    @Body()
    body: CreateAdminBodyReq[],
  ): Promise<Response<CreateAdminsRes>> {
    const results = await this.usersService.createAdmins(body);

    return {
      success: true,
      message: 'Administrator users created.',
      data: {
        admins: results,
      },
    };
  }

  @Post('/guardians')
  @HttpCode(201)
  @UseBefore(celebrate(createGuardiansSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async createGuardians(
    @Body()
    body: CreateGuardianBodyReq[],
  ): Promise<Response<CreateGuardiansRes>> {
    const results = await this.usersService.createGuardians(body);

    return {
      success: true,
      message: 'Guardian users created.',
      data: {
        guardians: results,
      },
    };
  }

  @Post('/sellers')
  @HttpCode(201)
  @UseBefore(celebrate(createSellersSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async createSellers(
    @Body()
    body: CreateSellerBodyReq[],
  ): Promise<Response<CreateSellersRes>> {
    const results = await this.usersService.createSellers(body);

    return {
      success: true,
      message: 'Seller users created.',
      data: {
        sellers: results,
      },
    };
  }

  @Post('/students')
  @HttpCode(201)
  @UseBefore(celebrate(createStudentsSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async createStudents(
    @Body()
    body: CreateStudentBodyReq[],
  ): Promise<Response<CreateStudentsRes>> {
    const results = await this.usersService.createStudents(body);

    return {
      success: true,
      message: 'Student users created.',
      data: {
        students: results,
      },
    };
  }

  @Get('/admins')
  public async readAdmins(): Promise<Response<ReadAdminsRes>> {
    const results = await this.usersService.readAdmins();

    return {
      success: true,
      message:
        results.length === 0 ? 'Administrator users not found.' : 'Administrator users found.',
      data: {
        admins: results,
      },
    };
  }

  @Get('/guardians')
  public async readGuardians(): Promise<Response<ReadGuardiansRes>> {
    const results = await this.usersService.readGuardians();

    return {
      success: true,
      message: results.length === 0 ? 'Guardian users not found.' : 'Guardian users found.',
      data: {
        guardians: results,
      },
    };
  }

  @Get('/sellers')
  public async readSellers(): Promise<Response<ReadSellersRes>> {
    const results = await this.usersService.readSellers();

    return {
      success: true,
      message: results.length === 0 ? 'Seller users not found.' : 'Seller users found.',
      data: {
        sellers: results,
      },
    };
  }

  @Get('/students')
  public async readStudents(): Promise<Response<ReadStudentsRes>> {
    const results = await this.usersService.readStudents();

    return {
      success: true,
      message: results.length === 0 ? 'Student users not found.' : 'Student users found.',
      data: {
        students: results,
      },
    };
  }

  @Get('/admins/:id')
  @UseBefore(celebrate(readUserSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async readAdmin(
    @Params()
    params: ReadUserParamsReq,
  ): Promise<Response<ReadAdminRes>> {
    const result = await this.usersService.readAdmin(params);

    return {
      success: true,
      message: 'Administrator user found.',
      data: {
        admin: result,
      },
    };
  }

  @Get('/guardians/:id')
  @UseBefore(celebrate(readUserSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async readGuardian(
    @Params()
    params: ReadUserParamsReq,
  ): Promise<Response<ReadGuardianRes>> {
    const result = await this.usersService.readGuardian(params);

    return {
      success: true,
      message: 'Guardian user found.',
      data: {
        guardian: result,
      },
    };
  }

  @Get('/sellers/:id')
  @UseBefore(celebrate(readUserSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async readSeller(
    @Params()
    params: ReadUserParamsReq,
  ): Promise<Response<ReadSellerRes>> {
    const result = await this.usersService.readSeller(params);

    return {
      success: true,
      message: 'Seller user found.',
      data: {
        seller: result,
      },
    };
  }

  @Get('/students/:id')
  @UseBefore(celebrate(readUserSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async readStudent(
    @Params()
    params: ReadUserParamsReq,
  ): Promise<Response<ReadStudentRes>> {
    const results = await this.usersService.readStudent(params);

    return {
      success: true,
      message: 'Student user found.',
      data: {
        student: results,
      },
    };
  }

  @Patch('/admins')
  @UseBefore(celebrate(updateAdminsSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async updateAdmins(
    @Body()
    body: UpdateAdminBodyReq[],
  ): Promise<Response<UpdateAdminsRes>> {
    const results = await this.usersService.updateAdmins(body);

    return {
      success: true,
      message: 'Administrator users updated.',
      data: {
        admins: results,
      },
    };
  }

  @Patch('/guardians')
  @UseBefore(celebrate(updateGuardiansSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async updateGuardians(
    @Body()
    body: UpdateGuardianBodyReq[],
  ): Promise<Response<UpdateGuardiansRes>> {
    const results = await this.usersService.updateGuardians(body);

    return {
      success: true,
      message: 'Guardian users updated.',
      data: {
        guardians: results,
      },
    };
  }

  @Patch('/sellers')
  @UseBefore(celebrate(updateSellersSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async updateSellers(
    @Body()
    body: UpdateSellerBodyReq[],
  ): Promise<Response<UpdateSellersRes>> {
    const results = await this.usersService.updateSellers(body);

    return {
      success: true,
      message: 'Seller users updated.',
      data: {
        sellers: results,
      },
    };
  }

  @Patch('/students')
  @UseBefore(celebrate(updateStudentsSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async updateStudents(
    @Body()
    body: UpdateStudentBodyReq[],
  ): Promise<Response<UpdateStudentsRes>> {
    const results = await this.usersService.updateStudents(body);

    return {
      success: true,
      message: 'Student users updated.',
      data: {
        students: results,
      },
    };
  }

  @Patch('/admins/:id')
  @UseBefore(celebrate(updateAdminSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async updateAdmin(
    @Params()
    params: UpdateUserParamsReq,
    @Body()
    body: UpdateAdminBodyReq,
  ): Promise<Response<UpdateAdminRes>> {
    const result = await this.usersService.updateAdmin(params, body);

    return {
      success: true,
      message: 'Administrator user updated.',
      data: {
        admin: result,
      },
    };
  }

  @Patch('/guardians/:id')
  @UseBefore(celebrate(updateGuardianSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async updateGuardian(
    @Params()
    params: UpdateUserParamsReq,
    @Body()
    body: UpdateGuardianBodyReq,
  ): Promise<Response<UpdateGuardianRes>> {
    const result = await this.usersService.updateGuardian(params, body);

    return {
      success: true,
      message: 'Guardian user updated.',
      data: {
        guardian: result,
      },
    };
  }

  @Patch('/sellers/:id')
  @UseBefore(celebrate(updateSellerSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async updateSeller(
    @Params()
    params: UpdateUserParamsReq,
    @Body()
    body: UpdateSellerBodyReq,
  ): Promise<Response<UpdateSellerRes>> {
    const result = await this.usersService.updateSeller(params, body);

    return {
      success: true,
      message: 'Seller user updated.',
      data: {
        seller: result,
      },
    };
  }

  @Patch('/students/:id')
  @UseBefore(celebrate(updateStudentSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async updateStudent(
    @Params()
    params: UpdateUserParamsReq,
    @Body()
    body: UpdateStudentBodyReq,
  ): Promise<Response<UpdateStudentRes>> {
    const result = await this.usersService.updateStudent(params, body);

    return {
      success: true,
      message: 'Student user updated.',
      data: {
        student: result,
      },
    };
  }

  @Delete('/admins')
  @UseBefore(celebrate(deleteUsersSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async deleteAdmins(
    @Body()
    body: DeleteUserBodyReq[],
  ): Promise<Response<void>> {
    await this.usersService.deleteAdmins(body);

    return {
      success: true,
      message: 'Administrator users deleted.',
    };
  }

  @Delete('/guardians')
  @UseBefore(celebrate(deleteUsersSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async deleteGuardians(
    @Body()
    body: DeleteUserBodyReq[],
  ): Promise<Response<void>> {
    await this.usersService.deleteGuardians(body);

    return {
      success: true,
      message: 'Guardian users deleted.',
    };
  }

  @Delete('/sellers')
  @UseBefore(celebrate(deleteUsersSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async deleteSellers(
    @Body()
    body: DeleteUserBodyReq[],
  ): Promise<Response<void>> {
    await this.usersService.deleteSellers(body);

    return {
      success: true,
      message: 'Seller users deleted.',
    };
  }

  @Delete('/students')
  @UseBefore(celebrate(deleteUsersSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async deleteStudents(
    @Body()
    body: DeleteUserBodyReq[],
  ): Promise<Response<void>> {
    await this.usersService.deleteStudents(body);

    return {
      success: true,
      message: 'Student users deleted.',
    };
  }

  @Delete('/admins/:id')
  @UseBefore(celebrate(deleteUserSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async deleteAdmin(
    @Params()
    params: DeleteUserParamsReq,
  ): Promise<Response<void>> {
    await this.usersService.deleteAdmin(params);

    return {
      success: true,
      message: 'Administrator user deleted.',
    };
  }

  @Delete('/guardians/:id')
  @UseBefore(celebrate(deleteUserSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async deleteGuardian(
    @Params()
    params: DeleteUserParamsReq,
  ): Promise<Response<void>> {
    await this.usersService.deleteGuardian(params);

    return {
      success: true,
      message: 'Guardian user deleted.',
    };
  }

  @Delete('/sellers/:id')
  @UseBefore(celebrate(deleteUserSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async deleteSeller(
    @Params()
    params: DeleteUserParamsReq,
  ): Promise<Response<void>> {
    await this.usersService.deleteSeller(params);

    return {
      success: true,
      message: 'Seller user deleted.',
    };
  }

  @Delete('/students/:id')
  @UseBefore(celebrate(deleteUserSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async deleteStudent(
    @Params()
    params: DeleteUserParamsReq,
  ): Promise<Response<void>> {
    await this.usersService.deleteStudent(params);

    return {
      success: true,
      message: 'Student user deleted.',
    };
  }
}
