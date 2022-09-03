import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { validatePaginationParams } from '../../../common/utils';
import { DeleteUserInput, ReadUserArgs, ReadUsersArgs } from '../dto';
import { DeleteUserPayload, User, UserConnection } from '../entities';
import { UsersService } from '../services';

@Resolver(() => User)
export class UsersResolver {
  public constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user' })
  public async readUser(@Args() args: ReadUserArgs) {
    return this.usersService.readUser(args);
  }

  @Query(() => UserConnection, { name: 'users' })
  public async readUsers(@Args() args: ReadUsersArgs) {
    await validatePaginationParams(args);

    return this.usersService.readUsers(args);
  }

  @Mutation(() => DeleteUserPayload)
  public async deleteUser(@Args('input') input: DeleteUserInput) {
    return await this.usersService.deleteUser(input);
  }
}
