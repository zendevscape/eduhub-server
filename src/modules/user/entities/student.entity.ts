import { Field, GraphQLISODateTime, ID, ObjectType, OmitType } from '@nestjs/graphql';
import { Connection, MutationPayload } from '../../../common/entities';
import { User } from './user.entity';

@ObjectType()
export class Student extends OmitType(User, ['role'] as const) {
  @Field(() => ID)
  public studentId: string;
  @Field(() => ID)
  public guardianId: string;
  @Field(() => String)
  public fatherName: string;
  @Field(() => String)
  public motherName: string;
  @Field(() => Boolean)
  public active: boolean;
  @Field(() => GraphQLISODateTime, { nullable: true })
  public deletedAt: Date | null;
}

@ObjectType()
export class StudentConnection extends Connection(Student) {}

@ObjectType()
export class CreateStudentPayload extends MutationPayload {
  @Field(() => Student)
  public student: Student;
}

@ObjectType()
export class UpdateStudentPayload extends CreateStudentPayload {}

@ObjectType()
export class DeleteStudentPayload extends CreateStudentPayload {}
