import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Response } from '../../../common/dtos';
import { ValidationPipe } from '../../../common/pipes';
import { JwtAuthGuard } from '../../auth/guards';
import { StudentsService } from '../services';
import {
  CreateStudentsBodyReq,
  CreateStudentsRes,
  DeleteStudentParamsReq,
  DeleteStudentsBodyReq,
  ReadStudentParamsReq,
  ReadStudentRes,
  ReadStudentsRes,
  UpdateStudentBodyReq,
  UpdateStudentParamsReq,
  UpdateStudentRes,
  UpdateStudentsBodyReq,
  UpdateStudentsRes,
} from '../dtos';
import {
  createStudentsSchema,
  deleteStudentSchema,
  deleteStudentsSchema,
  readStudentSchema,
  updateStudentSchema,
  updateStudentsSchema,
} from '../validations';

@Controller('students')
export class StudentsController {
  public constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createStudents(
    @Body(new ValidationPipe(createStudentsSchema.body))
    body: CreateStudentsBodyReq,
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
  @UseGuards(JwtAuthGuard)
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

  @Get(':studentId')
  @UseGuards(JwtAuthGuard)
  public async readStudent(
    @Param(new ValidationPipe(readStudentSchema.params))
    params: ReadStudentParamsReq,
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
  @UseGuards(JwtAuthGuard)
  public async updateStudents(
    @Body(new ValidationPipe(updateStudentsSchema.body))
    body: UpdateStudentsBodyReq,
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

  @Patch(':studentId')
  @UseGuards(JwtAuthGuard)
  public async updateStudent(
    @Body(new ValidationPipe(updateStudentSchema.body))
    body: UpdateStudentBodyReq,
    @Param(new ValidationPipe(updateStudentSchema.params))
    params: UpdateStudentParamsReq,
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
  @UseGuards(JwtAuthGuard)
  public async deleteStudents(
    @Body(new ValidationPipe(deleteStudentsSchema.body))
    body: DeleteStudentsBodyReq,
  ): Promise<Response<void>> {
    await this.studentsService.deleteStudents(body);

    return {
      success: true,
      message: 'Student users deleted.',
    };
  }

  @Delete(':studentId')
  @UseGuards(JwtAuthGuard)
  public async deleteStudent(
    @Param(new ValidationPipe(deleteStudentSchema.params))
    params: DeleteStudentParamsReq,
  ): Promise<Response<void>> {
    await this.studentsService.deleteStudent(params);

    return {
      success: true,
      message: 'Student user deleted.',
    };
  }
}
