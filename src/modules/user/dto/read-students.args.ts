import { ArgsType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { ConnectionArgs } from '../../../common/dto';
import { ReadUsersFilter } from './read-users.args';

abstract class ReadStudentsFilter extends ReadUsersFilter {
  @Field(() => GraphQLISODateTime, { nullable: true })
  public birthDateAt?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  public birthDateBefore?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  public birthDateAfter?: Date;
  @Field(() => String, { nullable: true })
  public fatherNameContains?: string;
  @Field(() => String, { nullable: true })
  public fatherNameStartsWith?: string;
  @Field(() => String, { nullable: true })
  public fatherNameEndsWith?: string;
  @Field(() => String, { nullable: true })
  public motherNameContains?: string;
  @Field(() => String, { nullable: true })
  public motherNameStartsWith?: string;
  @Field(() => String, { nullable: true })
  public motherNameEndsWith?: string;
}

@ArgsType()
export class ReadStudentsArgs extends ConnectionArgs {
  @Field(() => ReadStudentsFilter, { nullable: true })
  public where?: ReadStudentsFilter;
}
