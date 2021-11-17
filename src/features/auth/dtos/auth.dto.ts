import { Role } from '../../users/entities';

export interface CreateAccessTokenBodyReq {
  role: Role;
  email: string;
  password: string;
}

export interface UpdateAccessTokenBodyReq {
  refreshToken: string;
}

export interface DeleteRefreshTokenBodyReq extends UpdateAccessTokenBodyReq {}

export interface AccessTokenRes {
  accessToken: string;
  refreshToken: string;
}
