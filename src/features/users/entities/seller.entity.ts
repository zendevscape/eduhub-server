import { ChildEntity, OneToMany } from 'typeorm';
import type { Product } from '../../products/entities';
import { Role, User } from './user.entity';

@ChildEntity(Role.Seller)
export class Seller extends User {
  @OneToMany('Product', 'seller')
  public products: Product[];
}
