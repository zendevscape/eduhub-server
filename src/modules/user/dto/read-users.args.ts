import { ArgsType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { ConnectionArgs } from '../../../common/dto';

export abstract class ReadUsersFilter {
  @Field(() => String, { nullable: true })
  public nameContains?: string;
  @Field(() => String, { nullable: true })
  public nameStartsWith?: string;
  @Field(() => String, { nullable: true })
  public nameEndsWith?: string;
  @Field(() => String, { nullable: true })
  public emailContains?: string;
  @Field(() => String, { nullable: true })
  public emailStartsWith?: string;
  @Field(() => String, { nullable: true })
  public emailEndsWith?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  public createdBefore?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  public createdAfter?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  public updatedBefore?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  public updatedAfter?: Date;
}

@ArgsType()
export class ReadUsersArgs extends ConnectionArgs {
  @Field(() => ReadUsersFilter, { nullable: true })
  public where?: ReadUsersFilter;
}
