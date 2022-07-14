import { User } from './user.entity';

export class Staff extends User {
  public staffId: string;
  public isActive: boolean;
}
