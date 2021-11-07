import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from '../../order-items';
import { Seller, Student } from '../../users';

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

  @ManyToOne('Student')
  @JoinColumn({
    name: 'buyer_id',
  })
  public buyer: Student;

  @CreateDateColumn()
  public date: Date;

  @OneToMany('OrderItem', 'order')
  public orderItems: OrderItem[];

  @Column()
  public price: number;

  @Column()
  public status: OrderStatus;
}
