import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateGuardianInput } from './create-guardian.input';

@InputType()
export class UpdateGuardianInput extends PartialType(
  OmitType(CreateGuardianInput, ['id'] as const),
) {
  @Field(() => ID)
  public id: string;
}
