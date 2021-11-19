interface CreateStudentBody {
  name: string;
  email: string;
  password: string;
  guardianId: string;
}

export interface CreateStudentsBodyReq extends Array<CreateStudentBody> {}

export interface ReadStudentParamsReq {
  studentId: string;
}

export interface UpdateStudentBodyReq {
  name?: string;
  email?: string;
  guardianId?: string;
}

export interface UpdateStudentParamsReq extends ReadStudentParamsReq {}

interface UpdateStudentsBody {
  id: string;
  name?: string;
  email?: string;
  guardianId?: string;
}

export interface UpdateStudentsBodyReq extends Array<UpdateStudentsBody> {}

export interface DeleteStudentParamsReq extends ReadStudentParamsReq {}

interface DeleteStudentsBody {
  id: string;
}

export interface DeleteStudentsBodyReq extends Array<DeleteStudentsBody> {}

interface Student {
  id: string;
  name: string;
  email: string;
  guardianId: string;
  createdTime: Date;
  updatedTime: Date;
}

export interface StudentRes extends Student {}

export interface StudentsRes extends Array<Student> {}

export interface CreateStudentsRes {
  students: StudentsRes;
}

export interface ReadStudentRes {
  student: StudentRes;
}

export interface ReadStudentsRes extends CreateStudentsRes {}

export interface UpdateStudentRes extends ReadStudentRes {}

export interface UpdateStudentsRes extends CreateStudentsRes {}
