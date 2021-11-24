import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import type { OrderItem } from '../../orders/entities';
import type { Seller } from '../../users/entities';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne('Seller', 'products')
  @JoinColumn({
    name: 'seller_id',
  })
  public seller: Seller;

  @RelationId('seller')
  public sellerId: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public price: number;

  @Column()
  public stock: number;

  @OneToMany('OrderItem', 'product')
  public orderItems: OrderItem[];
}
