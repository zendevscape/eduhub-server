import { User } from './user.entity';

export class Employee extends User {
  public employeeId: string;
  public isActive: boolean;
}
