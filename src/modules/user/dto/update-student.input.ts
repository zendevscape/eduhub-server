import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';

@InputType()
export class UpdateStudentInput extends PartialType(OmitType(CreateStudentInput, ['id'] as const)) {
  @Field(() => ID)
  public id: string;
}
