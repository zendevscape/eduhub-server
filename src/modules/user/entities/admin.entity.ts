import { ChildEntity } from 'typeorm';
import { Role, User } from './user.entity';

@ChildEntity(Role.Admin)
export class Admin extends User {}
