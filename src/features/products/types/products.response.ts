export interface ProductData {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
}

export interface ProductsRes {
  products: ProductData | ProductData[];
}

export interface ProductRes {
  product: ProductData;
}
