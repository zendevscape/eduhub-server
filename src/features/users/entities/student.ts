import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm';
import { Role, User } from './user';
import type { Guardian } from './guardian';

@ChildEntity(Role.Student)
export class Student extends User {
  @ManyToOne('Guardian', 'students')
  @JoinColumn({
    name: 'guardian_id',
  })
  public guardian: Guardian;
}
