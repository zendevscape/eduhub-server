import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import type { Product } from '../../products/entities';
import type { Order } from './order';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne('Order', 'orderItems', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'order_id',
  })
  public order: Order;

  @ManyToOne('Product', 'orderItems')
  @JoinColumn({
    name: 'product_id',
  })
  public product: Product;

  @RelationId('product')
  public productId: string;

  @Column()
  public quantity: number;

  @Column()
  public price: number;
}
