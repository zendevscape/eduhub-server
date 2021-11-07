import { CreateUserBodyReq, UpdateUserBodyReq, UserRes } from './users.dto';

export interface CreateStudentBodyReq extends CreateUserBodyReq {
  guardianId: string;
}

export interface UpdateStudentBodyReq extends UpdateUserBodyReq {
  guardianId?: string;
}

export interface StudentRes extends UserRes {
  guardianId: string;
}

export interface CreateStudentsRes {
  students: StudentRes[];
}

export interface ReadStudentRes {
  student: StudentRes;
}

export interface ReadStudentsRes extends CreateStudentsRes {}

export interface UpdateStudentRes extends ReadStudentRes {}

export interface UpdateStudentsRes extends CreateStudentsRes {}
