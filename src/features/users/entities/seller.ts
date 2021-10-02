import { ChildEntity, OneToMany } from 'typeorm';
import { Product } from '../../products/entities';
import { Role, User } from './user';

@ChildEntity(Role.Seller)
export class Seller extends User {
  @OneToMany(() => Product, (product) => product.seller)
  public products: Product[];
}
