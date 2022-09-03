import { Field, GraphQLISODateTime, ID, ObjectType, OmitType } from '@nestjs/graphql';
import { Connection, MutationPayload } from '../../../common/entities';
import { User } from './user.entity';

@ObjectType()
export class Employee extends OmitType(User, ['role'] as const) {
  @Field(() => ID)
  public employeeId: string;
  @Field(() => Boolean)
  public active: boolean;
  @Field(() => GraphQLISODateTime, { nullable: true })
  public deletedAt: Date | null;
}

@ObjectType()
export class EmployeeConnection extends Connection(Employee) {}

@ObjectType()
export class CreateEmployeePayload extends MutationPayload {
  @Field(() => Employee)
  public employee: Employee;
}

@ObjectType()
export class UpdateEmployeePayload extends CreateEmployeePayload {}

@ObjectType()
export class DeleteEmployeePayload extends CreateEmployeePayload {}
