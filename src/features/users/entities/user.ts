import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { lowercase } from '../../../core/utils/value-transformers';
import { Transaction } from '../../transactions/entities';

export enum Role {
  Admin = 'admin',
  Student = 'student',
  Guardian = 'guardian',
  Seller = 'seller',
}

@Entity('users')
@TableInheritance({
  column: {
    type: 'enum',
    name: 'role',
    enum: Role,
  },
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({
    unique: true,
    nullable: false,
    transformer: [lowercase],
  })
  public email: string;

  @Column({
    select: false,
    nullable: false,
  })
  public password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  public transactions: Transaction[];

  @Column()
  public balance: number;

  @Column()
  @CreateDateColumn()
  public createdTime: Date;

  @Column()
  @UpdateDateColumn()
  public updatedTime: Date;
}
