import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../../../core/services';
import { Guardian, Student } from '../entities';
import {
  CreateStudentBodyReq,
  DeleteUserBodyReq,
  DeleteUserParamsReq,
  ReadUserParamsReq,
  StudentRes,
  UpdateStudentBodyReq,
  UpdateUserParamsReq,
} from '../dtos';

@Injectable()
export class StudentsService {
  public constructor(
    private readonly passwordService: PasswordService,

    @InjectRepository(Guardian)
    private readonly guardiansRepository: Repository<Guardian>,

    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  public async createStudents(students: CreateStudentBodyReq[]): Promise<StudentRes[]> {
    const results = await this.studentsRepository.save(
      await Promise.all(
        students.map(async (student) => {
          const guardian = await this.guardiansRepository.findOneOrFail(student.guardianId);

          return this.studentsRepository.create({
            ...student,
            password: await this.passwordService.hash(student.password),
            guardian: { id: guardian.id },
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        guardianId: result.guardian.id,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async readStudent(student: ReadUserParamsReq): Promise<StudentRes> {
    const result = await this.studentsRepository.findOneOrFail(student.id, {
      relations: ['guardian'],
    });

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      guardianId: result.guardian.id,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async readStudents(): Promise<StudentRes[]> {
    const results = await this.studentsRepository.find({
      relations: ['guardian'],
    });

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        guardianId: result.guardian.id,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async updateStudent(
    student: UpdateUserParamsReq,
    newStudent: UpdateStudentBodyReq,
  ): Promise<StudentRes> {
    const oldStudent = await this.studentsRepository.findOneOrFail(student.id, {
      relations: ['guardian'],
    });

    const guardian = newStudent.guardianId
      ? await this.guardiansRepository.findOneOrFail(newStudent.guardianId)
      : oldStudent.guardian;

    const result = await this.studentsRepository.save(
      this.studentsRepository.create({
        ...oldStudent,
        ...newStudent,
        guardian: { id: guardian.id },
      }),
    );

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      guardianId: result.guardian.id,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async updateStudents(students: UpdateStudentBodyReq[]): Promise<StudentRes[]> {
    const results = await this.studentsRepository.save(
      await Promise.all(
        students.map(async (student) => {
          const oldStudent = await this.studentsRepository.findOneOrFail(student.id, {
            relations: ['guardian'],
          });

          const guardian = student.guardianId
            ? await this.guardiansRepository.findOneOrFail(student.guardianId)
            : oldStudent.guardian;

          return this.studentsRepository.create({
            ...oldStudent,
            ...student,
            guardian: { id: guardian.id },
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        guardianId: result.guardian.id,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async deleteStudent(student: DeleteUserParamsReq): Promise<void> {
    await this.studentsRepository.remove(await this.studentsRepository.findOneOrFail(student.id));
  }

  public async deleteStudents(students: DeleteUserBodyReq[]): Promise<void> {
    await this.studentsRepository.remove(
      await Promise.all(
        students.map(async (student) => {
          return await this.studentsRepository.findOneOrFail(student.id);
        }),
      ),
    );
  }
}
