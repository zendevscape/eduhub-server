import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateEmployeeInput } from './create-employee.input';

@InputType()
export class UpdateEmployeeInput extends PartialType(
  OmitType(CreateEmployeeInput, ['id'] as const),
) {
  @Field(() => ID)
  public id: string;
}
