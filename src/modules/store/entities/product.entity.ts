import type { OrderItem } from '.';
import type { Seller } from '../../user/entities';

export class Product {
  public id: string;
  public seller: Seller;
  public sellerId: string;
  public name: string;
  public description: string;
  public price: number;
  public stock: number;
  public orderItems: OrderItem[];
}
