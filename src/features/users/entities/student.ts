import { ChildEntity, Column, ManyToOne } from 'typeorm';
import { Guardian } from './guardian';
import { Role, User } from './user';

@ChildEntity(Role.Student)
export class Student extends User {
  @Column()
  public birthDate: Date;

  @Column()
  public fatherName: string;

  @Column()
  public motherName: string;

  @ManyToOne(() => Guardian, (guardian) => guardian.students, {
    nullable: false,
  })
  public guardian: number;

  @Column()
  public registeredDate: Date;
}
