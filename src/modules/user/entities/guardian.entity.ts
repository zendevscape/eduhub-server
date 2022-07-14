import { User } from './user.entity';
import { Student } from './student.entity';

export class Guardian extends User {
  public students: Student[];
}
