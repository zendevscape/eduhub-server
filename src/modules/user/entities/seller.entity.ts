import { Product } from '../../store/entities';
import { User } from './user.entity';

export class Seller extends User {
  public products: Product[];
}
