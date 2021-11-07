import { ChildEntity, OneToMany } from 'typeorm';
import { Student } from './student';
import { Role, User } from './user';

@ChildEntity(Role.Guardian)
export class Guardian extends User {
  @OneToMany('Student', 'guardian')
  public students: Student[];
}
