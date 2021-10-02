import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from '../../order-items/entities';
import { Seller, Student } from '../../users/entities';

export enum OrderStatus {
  Success = 'success',
  Failed = 'failed',
  Pending = 'pending',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Seller)
  public seller: Seller;

  @ManyToOne(() => Student)
  public buyer: Student;

  @CreateDateColumn()
  public date: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  public orderItems: OrderItem[];

  @Column()
  public price: number;

  @Column()
  public status: OrderStatus;
}
