import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import type { User } from '../../users/entities';

@Entity('balances')
export class Balance {
  @OneToOne('User', 'balance', {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  public user: User;

  @RelationId('user')
  public userId: string;

  @Column({
    default: 0,
  })
  public amount: number;
}
