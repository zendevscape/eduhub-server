import { ChildEntity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Role, User } from './user.entity';
import type { Guardian } from './guardian.entity';

@ChildEntity(Role.Student)
export class Student extends User {
  @ManyToOne('Guardian', 'students')
  @JoinColumn({
    name: 'guardian_id',
  })
  public guardian: Guardian;

  @RelationId('guardian')
  public guardianId: string;
}
