import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { encrypt, lowercase } from '../../../core/utils';
import type { Balance, Transaction } from '../../finances/entities';

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
    select: true,
  },
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public role: Role;

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
    transformer: [encrypt],
  })
  public password: string;

  @OneToMany('Transaction', 'user')
  public transactions: Transaction[];

  @OneToOne('Balance', 'user', {
    cascade: ['remove', 'soft-remove', 'recover'],
  })
  public balance: Balance;

  @CreateDateColumn({
    name: 'created_time',
  })
  public createdTime: Date;

  @UpdateDateColumn({
    name: 'updated_time',
  })
  public updatedTime: Date;

  @AfterLoad()
  public readDefaultBalance(): void {
    if (this.balance === null) {
      this.balance = { user: this, userId: this.id, amount: 0 };
    }
  }
}
