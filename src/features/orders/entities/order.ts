import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import type { Seller, Student } from '../../users/entities';
import type { OrderItem } from './order-item';

export enum OrderStatus {
  Success = 'success',
  Failed = 'failed',
  Pending = 'pending',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne('Seller')
  @JoinColumn({
    name: 'seller_id',
  })
  public seller: Seller;

  @RelationId('seller')
  public sellerId: string;

  @ManyToOne('Student')
  @JoinColumn({
    name: 'buyer_id',
  })
  public buyer: Student;

  @RelationId('buyer')
  public buyerId: string;

  @CreateDateColumn()
  public date: Date;

  @Column()
  public status: OrderStatus;

  @Column()
  public message: string;

  @Column()
  public amount: number;

  @OneToMany('OrderItem', 'order', {
    cascade: true,
  })
  public orderItems: OrderItem[];
}
