import { OrderStatus } from '../entities';

interface CreateOrderItemBody {
  productId: string;
  quantity: number;
}

interface CreateOrderBody {
  sellerId?: string;
  buyerId: string;
  orderItems: CreateOrderItemBody[];
}

export interface CreateOrdersBodyReq extends Array<CreateOrderBody> {}

export interface CreateOrdersParamsReq {
  sellerId?: string;
}

export interface ReadOrderParamsReq extends CreateOrdersParamsReq {
  studentId?: string;
  orderId: string;
}

export interface ReadOrdersParamsReq extends CreateOrdersParamsReq {
  studentId?: string;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  sellerId: string;
  buyerId: string;
  date: Date;
  amount: number;
  status: OrderStatus;
  message: string;
  orderItems: OrderItem[];
}

export interface OrderRes extends Order {}

export interface OrdersRes extends Array<Order> {}

export interface CreateOrdersRes {
  orders: OrdersRes;
}

export interface ReadOrderRes {
  order: OrderRes;
}

export interface ReadOrdersRes extends CreateOrdersRes {}
