interface CreateAdminBody {
  name: string;
  email: string;
  password: string;
}

export interface CreateAdminsBodyReq extends Array<CreateAdminBody> {}

export interface ReadAdminParamsReq {
  adminId: string;
}

export interface UpdateAdminBodyReq {
  name?: string;
  email?: string;
}

export interface UpdateAdminParamsReq extends ReadAdminParamsReq {}

interface UpdateAdminsBody {
  id: string;
  name?: string;
  email?: string;
}

export interface UpdateAdminsBodyReq extends Array<UpdateAdminsBody> {}

export interface DeleteAdminParamsReq extends ReadAdminParamsReq {}

interface DeleteAdminsBody {
  id: string;
}

export interface DeleteAdminsBodyReq extends Array<DeleteAdminsBody> {}

interface Admin {
  id: string;
  name: string;
  email: string;
  created: Date;
  updated: Date;
}

export interface AdminRes extends Admin {}

export interface AdminsRes extends Array<Admin> {}

export interface CreateAdminsRes {
  admins: AdminsRes;
}

export interface ReadAdminRes {
  admin: AdminRes;
}

export interface ReadAdminsRes extends CreateAdminsRes {}

export interface UpdateAdminRes extends ReadAdminRes {}

export interface UpdateAdminsRes extends CreateAdminsRes {}
