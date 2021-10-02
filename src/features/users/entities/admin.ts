import { ChildEntity } from 'typeorm';
import { Role, User } from './user';

@ChildEntity(Role.Admin)
export class Admin extends User {}
