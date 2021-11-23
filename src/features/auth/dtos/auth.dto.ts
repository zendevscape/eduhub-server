import { Role } from '../../users/entities';

export interface ValidateUserReq {
  email: string;
  password: string;
  role: Role;
}

export interface CreateAccessTokenReq {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface UpdateAccessTokenBodyReq {
  refreshToken: string;
}

export interface DeleteRefreshTokenBodyReq extends UpdateAccessTokenBodyReq {}

export interface UserRes {
  id: string;
  role: Role;
}

export interface AccessTokenRes {
  accessToken: string;
  refreshToken: string;
}
