import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm';
import { Guardian } from './guardian';
import { Role, User } from './user';

@ChildEntity(Role.Student)
export class Student extends User {
  @ManyToOne(() => Guardian, (guardian) => guardian.students)
  @JoinColumn({
    name: 'guardian_id',
  })
  public guardian: Guardian;
}
