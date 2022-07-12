interface CreateSellerBody {
  name: string;
  email: string;
  password: string;
}

export interface CreateSellersBodyReq extends Array<CreateSellerBody> {}

export interface ReadSellerParamsReq {
  sellerId: string;
}

export interface UpdateSellerBodyReq {
  name?: string;
  email?: string;
}

export interface UpdateSellerParamsReq extends ReadSellerParamsReq {}

interface UpdateSellersBody {
  id: string;
  name?: string;
  email?: string;
}

export interface UpdateSellersBodyReq extends Array<UpdateSellersBody> {}

export interface DeleteSellerParamsReq extends ReadSellerParamsReq {}

interface DeleteSellersBody {
  id: string;
}

export interface DeleteSellersBodyReq extends Array<DeleteSellersBody> {}

interface Seller {
  id: string;
  name: string;
  email: string;
  created: Date;
  updated: Date;
}

export interface SellerRes extends Seller {}

export interface SellersRes extends Array<Seller> {}

export interface CreateSellersRes {
  sellers: SellersRes;
}

export interface ReadSellerRes {
  seller: SellerRes;
}

export interface ReadSellersRes extends CreateSellersRes {}

export interface UpdateSellerRes extends ReadSellerRes {}

export interface UpdateSellersRes extends CreateSellersRes {}
