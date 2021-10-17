interface CreateUserBodyReq {
  name: string;
  email: string;
  password: string;
}

export interface CreateAdminBodyReq extends CreateUserBodyReq {}

export interface CreateGuardianBodyReq extends CreateUserBodyReq {}

export interface CreateSellerBodyReq extends CreateUserBodyReq {}

export interface CreateStudentBodyReq extends CreateUserBodyReq {
  guardianId: string;
}

export interface ReadUserParamsReq {
  id: string;
}

interface UpdateUserBodyReq {
  id?: string;
  name?: string;
  email?: string;
}

export interface UpdateAdminBodyReq extends UpdateUserBodyReq {}

export interface UpdateGuardianBodyReq extends UpdateUserBodyReq {}

export interface UpdateSellerBodyReq extends UpdateUserBodyReq {}

export interface UpdateStudentBodyReq extends UpdateUserBodyReq {
  guardianId?: string;
}

export interface UpdateUserParamsReq {
  id: string;
}

export interface DeleteUserBodyReq {
  id: string;
}

export interface DeleteUserParamsReq extends DeleteUserBodyReq {}
