import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders';
import { Product } from '../../products';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne('Order', 'orderItems')
  @JoinColumn({
    name: 'order_id',
  })
  public order: Order;

  @ManyToOne('Product', 'orderItems')
  @JoinColumn({
    name: 'product_id',
  })
  public product: Product;

  @Column()
  public quantity: number;

  @Column()
  public price: number;
}
