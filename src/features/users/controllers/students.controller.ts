import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Response } from '../../../core/dtos';
import { ValidationPipe } from '../../../core/pipes';
import { StudentsService } from '../services';
import {
  CreateStudentBodyReq,
  CreateStudentsRes,
  DeleteUserBodyReq,
  DeleteUserParamsReq,
  ReadStudentRes,
  ReadStudentsRes,
  ReadUserParamsReq,
  UpdateStudentBodyReq,
  UpdateStudentRes,
  UpdateStudentsRes,
  UpdateUserParamsReq,
} from '../dtos';
import {
  createStudentsSchema,
  deleteUserSchema,
  deleteUsersSchema,
  readUserSchema,
  updateStudentSchema,
  updateStudentsSchema,
} from '../validations';

@Controller('students')
export class StudentsController {
  public constructor(private readonly studentsService: StudentsService) {}

  @Post()
  public async createStudents(
    @Body(new ValidationPipe(createStudentsSchema.body))
    body: CreateStudentBodyReq[],
  ): Promise<Response<CreateStudentsRes>> {
    const results = await this.studentsService.createStudents(body);

    return {
      success: true,
      message: 'Student users created.',
      data: {
        students: results,
      },
    };
  }

  @Get()
  public async readStudents(): Promise<Response<ReadStudentsRes>> {
    const results = await this.studentsService.readStudents();

    return {
      success: true,
      message: results.length === 0 ? 'Student users not found.' : 'Student users found.',
      data: {
        students: results,
      },
    };
  }

  @Get(':id')
  public async readStudent(
    @Param(new ValidationPipe(readUserSchema.params))
    params: ReadUserParamsReq,
  ): Promise<Response<ReadStudentRes>> {
    const results = await this.studentsService.readStudent(params);

    return {
      success: true,
      message: 'Student user found.',
      data: {
        student: results,
      },
    };
  }

  @Patch()
  public async updateStudents(
    @Body(new ValidationPipe(updateStudentsSchema.body))
    body: UpdateStudentBodyReq[],
  ): Promise<Response<UpdateStudentsRes>> {
    const results = await this.studentsService.updateStudents(body);

    return {
      success: true,
      message: 'Student users updated.',
      data: {
        students: results,
      },
    };
  }

  @Patch(':id')
  public async updateStudent(
    @Body(new ValidationPipe(updateStudentSchema.body))
    body: UpdateStudentBodyReq,
    @Param(new ValidationPipe(updateStudentSchema.params))
    params: UpdateUserParamsReq,
  ): Promise<Response<UpdateStudentRes>> {
    const result = await this.studentsService.updateStudent(params, body);

    return {
      success: true,
      message: 'Student user updated.',
      data: {
        student: result,
      },
    };
  }

  @Delete()
  public async deleteStudents(
    @Body(new ValidationPipe(deleteUsersSchema.body))
    body: DeleteUserBodyReq[],
  ): Promise<Response<void>> {
    await this.studentsService.deleteStudents(body);

    return {
      success: true,
      message: 'Student users deleted.',
    };
  }

  @Delete(':id')
  public async deleteStudent(
    @Param(new ValidationPipe(deleteUserSchema.params))
    params: DeleteUserParamsReq,
  ): Promise<Response<void>> {
    await this.studentsService.deleteStudent(params);

    return {
      success: true,
      message: 'Student user deleted.',
    };
  }
}
