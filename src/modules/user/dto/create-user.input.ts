import { Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { MutationArgs } from '../../../common/dto';

export abstract class CreateUserInput extends MutationArgs {
  @Field(() => ID, { nullable: true })
  public id?: string;
  @Field(() => String, { nullable: true })
  public email?: string;
  @Field(() => String, { nullable: true })
  public password?: string;
  @Field(() => String, { nullable: true })
  public name?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  public birthDate?: Date;
}
