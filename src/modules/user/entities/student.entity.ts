import { User } from './user.entity';

export class Student extends User {
  public studentId: string;
  public guardianId: string;
  public birthDate: Date;
  public fatherName: string;
  public motherName: string;
  public isActive: boolean;
}
