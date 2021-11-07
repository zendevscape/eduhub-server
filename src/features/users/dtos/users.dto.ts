export interface CreateUserBodyReq {
  name: string;
  email: string;
  password: string;
}

export interface ReadUserParamsReq {
  id: string;
}

export interface UpdateUserParamsReq {
  id: string;
}

export interface UpdateUserBodyReq {
  id?: string;
  name?: string;
  email?: string;
}

export interface DeleteUserBodyReq {
  id: string;
}

export interface DeleteUserParamsReq extends DeleteUserBodyReq {}

export interface UserRes {
  id: string;
  name: string;
  email: string;
  createdTime: Date;
  updatedTime: Date;
}
