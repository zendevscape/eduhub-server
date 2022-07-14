import type { Balance, Transaction } from '../../finance/entities';

export enum Role {
  Admin = 'admin',
  Student = 'student',
  Guardian = 'guardian',
  Seller = 'seller',
}

export class User {
  public id: string;
  public role: Role;
  public name: string;
  public email: string;
  public password: string;
  public transactions: Transaction[];
  public balance: Balance;
  public created: Date;
  public updated: Date;
}
