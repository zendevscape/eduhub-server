import type { Order } from './order.entity';
import { Product } from './product.entity';

export class OrderItem {
  public id: string;
  public order: Order;
  public product: Product;
  public productId: string;
  public quantity: number;
  public price: number;
}
