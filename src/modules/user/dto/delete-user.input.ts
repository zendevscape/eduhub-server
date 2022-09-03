import { Field, ID, InputType } from '@nestjs/graphql';
import { MutationArgs } from '../../../common/dto';

@InputType()
export class DeleteUserInput extends MutationArgs {
  @Field(() => ID)
  public id: string;
  @Field(() => Boolean, { nullable: true })
  public permanent?: boolean;
}
