interface CreateProductBody {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface CreateProductsBodyReq extends Array<CreateProductBody> {}

export interface CreateProductsParamsReq {
  sellerId: string;
}

export interface ReadProductParamsReq extends CreateProductsParamsReq {
  productId: string;
}

export interface ReadProductsParamsReq extends CreateProductsParamsReq {}

export interface UpdateProductBodyReq {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface UpdateProductParamsReq extends ReadProductParamsReq {}

interface UpdateProductsBody {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface UpdateProductsBodyReq extends Array<UpdateProductsBody> {}

export interface UpdateProductsParamsReq extends CreateProductsParamsReq {}

export interface DeleteProductParamsReq extends ReadProductParamsReq {}

interface DeleteProductsBody {
  id: string;
}

export interface DeleteProductsBodyReq extends Array<DeleteProductsBody> {}

export interface DeleteProductsParamsReq extends CreateProductsParamsReq {}

interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface ProductRes extends Product {}

export interface ProductsRes extends Array<Product> {}

export interface CreateProductsRes {
  products: ProductsRes;
}

export interface ReadProductRes {
  product: ProductRes;
}

export interface ReadProductsRes extends CreateProductsRes {}

export interface UpdateProductRes extends ReadProductRes {}

export interface UpdateProductsRes extends CreateProductsRes {}
