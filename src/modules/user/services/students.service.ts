import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../../../common/services';
import { Guardian, Student } from '../entities';
import {
  CreateStudentsBodyReq,
  DeleteStudentParamsReq,
  DeleteStudentsBodyReq,
  ReadStudentParamsReq,
  StudentRes,
  StudentsRes,
  UpdateStudentBodyReq,
  UpdateStudentParamsReq,
  UpdateStudentsBodyReq,
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

  public async createStudents(students: CreateStudentsBodyReq): Promise<StudentsRes> {
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
        guardianId: result.guardianId,
        created: result.created,
        updated: result.updated,
      };
    });
  }

  public async readStudent(id: ReadStudentParamsReq): Promise<StudentRes> {
    const result = await this.studentsRepository.findOneOrFail(id.studentId, {
      relations: ['guardian'],
    });

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      guardianId: result.guardianId,
      created: result.created,
      updated: result.updated,
    };
  }

  public async readStudents(): Promise<StudentsRes> {
    const results = await this.studentsRepository.find({
      relations: ['guardian'],
    });

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        guardianId: result.guardianId,
        created: result.created,
        updated: result.updated,
      };
    });
  }

  public async updateStudent(
    id: UpdateStudentParamsReq,
    student: UpdateStudentBodyReq,
  ): Promise<StudentRes> {
    const oldStudent = await this.studentsRepository.findOneOrFail(id.studentId, {
      relations: ['guardian'],
    });

    const guardian = student.guardianId
      ? await this.guardiansRepository.findOneOrFail(student.guardianId)
      : oldStudent.guardian;

    const result = await this.studentsRepository.save(
      this.studentsRepository.create({
        ...oldStudent,
        ...student,
        guardian: { id: guardian.id },
      }),
    );

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      guardianId: result.guardianId,
      created: result.created,
      updated: result.updated,
    };
  }

  public async updateStudents(students: UpdateStudentsBodyReq): Promise<StudentsRes> {
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
        guardianId: result.guardianId,
        created: result.created,
        updated: result.updated,
      };
    });
  }

  public async deleteStudent(id: DeleteStudentParamsReq): Promise<void> {
    await this.studentsRepository.remove(await this.studentsRepository.findOneOrFail(id.studentId));
  }

  public async deleteStudents(students: DeleteStudentsBodyReq): Promise<void> {
    await this.studentsRepository.remove(
      await Promise.all(
        students.map(async (student) => {
          return await this.studentsRepository.findOneOrFail(student.id);
        }),
      ),
    );
  }
}
