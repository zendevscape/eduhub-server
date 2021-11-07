import { CreateUserBodyReq, UpdateUserBodyReq, UserRes } from './users.dto';

export interface CreateGuardianBodyReq extends CreateUserBodyReq {}

export interface UpdateGuardianBodyReq extends UpdateUserBodyReq {}

export interface GuardianRes extends UserRes {}

export interface CreateGuardiansRes {
  guardians: GuardianRes[];
}

export interface ReadGuardianRes {
  guardian: GuardianRes;
}

export interface ReadGuardiansRes extends CreateGuardiansRes {}

export interface UpdateGuardianRes extends ReadGuardianRes {}

export interface UpdateGuardiansRes extends CreateGuardiansRes {}
