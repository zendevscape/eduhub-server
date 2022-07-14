import { User } from './user.entity';
import { Guardian } from './guardian.entity';

export class Student extends User {
  public guardian: Guardian;
  public guardianId: string;
}
