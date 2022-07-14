export class User {
  public id: string;
  public name: string;
  public email: string;
  public password?: string;
  public role?: { [Key in string]?: boolean };
  public createdAt: Date;
  public updatedAt: Date;
}
