import type { Seller, Student } from '../../user/entities';
import type { OrderItem } from './order-item.entity';

export enum OrderStatus {
  Success = 'success',
  Failed = 'failed',
  Pending = 'pending',
}

export class Order {
  public id: string;
  public seller: Seller;
  public sellerId: string;
  public buyer: Student;
  public buyerId: string;
  public date: Date;
  public status: OrderStatus;
  public message: string;
  public amount: number;
  public orderItems: OrderItem[];
}
