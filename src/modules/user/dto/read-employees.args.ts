import { ArgsType, Field } from '@nestjs/graphql';
import { ConnectionArgs } from '../../../common/dto';
import { ReadUsersFilter } from './read-users.args';

abstract class ReadEmployeesFilter extends ReadUsersFilter {}

@ArgsType()
export class ReadEmployeesArgs extends ConnectionArgs {
  @Field(() => ReadEmployeesFilter, { nullable: true })
  public where?: ReadEmployeesFilter;
}
