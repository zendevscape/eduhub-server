import { ArgsType, Field } from '@nestjs/graphql';
import { ConnectionArgs } from '../../../common/dto';
import { ReadUsersFilter } from './read-users.args';

abstract class ReadGuardiansFilter extends ReadUsersFilter {}

@ArgsType()
export class ReadGuardiansArgs extends ConnectionArgs {
  @Field(() => ReadGuardiansFilter, { nullable: true })
  public where?: ReadGuardiansFilter;
}
