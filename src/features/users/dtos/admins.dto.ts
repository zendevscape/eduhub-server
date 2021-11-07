import { CreateUserBodyReq, UpdateUserBodyReq, UserRes } from './users.dto';

export interface CreateAdminBodyReq extends CreateUserBodyReq {}

export interface UpdateAdminBodyReq extends UpdateUserBodyReq {}

export interface AdminRes extends UserRes {}

export interface CreateAdminsRes {
  admins: AdminRes[];
}

export interface ReadAdminRes {
  admin: AdminRes;
}

export interface ReadAdminsRes extends CreateAdminsRes {}

export interface UpdateAdminRes extends ReadAdminRes {}

export interface UpdateAdminsRes extends CreateAdminsRes {}
