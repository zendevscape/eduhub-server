import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from '../../order-items/entities';
import { Seller } from '../../users/entities';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Seller, (seller) => seller.products)
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
