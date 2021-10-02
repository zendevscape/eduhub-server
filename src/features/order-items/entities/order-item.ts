import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities';
import { Product } from '../../products/entities';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Order, (order) => order.orderItems)
  public order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  public product: Product;

  @Column()
  public quantity: number;

  @Column()
  public price: number;
}
