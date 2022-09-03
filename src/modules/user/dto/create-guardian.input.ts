import { Field, InputType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class CreateGuardianInput extends CreateUserInput {
  @Field(() => Boolean, { nullable: true })
  public active?: boolean;
}
