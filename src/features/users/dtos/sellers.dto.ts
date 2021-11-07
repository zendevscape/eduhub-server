import { CreateUserBodyReq, UpdateUserBodyReq, UserRes } from './users.dto';

export interface CreateSellerBodyReq extends CreateUserBodyReq {}

export interface UpdateSellerBodyReq extends UpdateUserBodyReq {}

export interface SellerRes extends UserRes {}

export interface CreateSellersRes {
  sellers: SellerRes[];
}

export interface ReadSellerRes {
  seller: SellerRes;
}

export interface ReadSellersRes extends CreateSellersRes {}

export interface UpdateSellerRes extends ReadSellerRes {}

export interface UpdateSellersRes extends CreateSellersRes {}
