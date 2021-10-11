export interface CreateProductsReq {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductByIdReq {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface UpdateProducts {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface DeleteProductsReq {
  id: string;
}
