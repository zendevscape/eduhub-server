interface CreateGuardianBody {
  name: string;
  email: string;
  password: string;
}

export interface CreateGuardiansBodyReq extends Array<CreateGuardianBody> {}

export interface ReadGuardianParamsReq {
  guardianId: string;
}

export interface UpdateGuardianBodyReq {
  name?: string;
  email?: string;
}

export interface UpdateGuardianParamsReq extends ReadGuardianParamsReq {}

interface UpdateGuardiansBody {
  id: string;
  name?: string;
  email?: string;
}

export interface UpdateGuardiansBodyReq extends Array<UpdateGuardiansBody> {}

export interface DeleteGuardianParamsReq extends ReadGuardianParamsReq {}

interface DeleteGuardiansBody {
  id: string;
}

export interface DeleteGuardiansBodyReq extends Array<DeleteGuardiansBody> {}

interface Guardian {
  id: string;
  name: string;
  email: string;
  createdTime: Date;
  updatedTime: Date;
}

export interface GuardianRes extends Guardian {}

export interface GuardiansRes extends Array<Guardian> {}

export interface CreateGuardiansRes {
  guardians: GuardiansRes;
}

export interface ReadGuardianRes {
  guardian: GuardianRes;
}

export interface ReadGuardiansRes extends CreateGuardiansRes {}

export interface UpdateGuardianRes extends ReadGuardianRes {}

export interface UpdateGuardiansRes extends CreateGuardiansRes {}
