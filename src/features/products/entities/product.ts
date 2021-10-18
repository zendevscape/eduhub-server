import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from '../../order-items';
import { Seller } from '../../users';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Seller, (seller) => seller.products)
  @JoinColumn({
    name: 'seller_id',
  })
  public seller: Seller;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public price: number;

  @Column()
  public stock: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  public orderItems: OrderItem[];
}
