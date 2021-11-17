import { ChildEntity, OneToMany } from 'typeorm';
import { Role, User } from './user';
import type { Student } from './student';

@ChildEntity(Role.Guardian)
export class Guardian extends User {
  @OneToMany('Student', 'guardian')
  public students: Student[];
}
