import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../../../common/services';
import { getPaginationParams } from '../../../common/utils';
import { DeleteUserInput, ReadUserArgs, ReadUsersArgs } from '../dto';
import { DeleteUserPayload, User, UserConnection } from '../entities';

@Injectable()
export class UsersService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async readUser({ id }: ReadUserArgs): Promise<User> {
    const result = await this.databaseService.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    return {
      id: result.id,
      email: result.email,
      role: result.role as unknown as JSON,
      name: result.name,
      birthDate: result.birthDate,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  public async readUsers({
    first,
    after,
    last,
    before,
    where,
  }: ReadUsersArgs): Promise<UserConnection> {
    const { limit, cursor } = await getPaginationParams({
      first,
      last,
      after,
      before,
    });

    const results = await this.databaseService.user.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: {
        id: cursor,
      },
      where: {
        name: {
          contains: where?.nameContains,
        },
        email: {
          contains: where?.emailContains,
        },
      },
    });

    const users = results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    });

    // TODO add paginated return
    return {
      edges: [],
      nodes: [],
      pageInfo: {
        startCursor: '',
        endCursor: '',
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  public async deleteUser({
    clientMutationId,
    id,
    permanent,
  }: DeleteUserInput): Promise<DeleteUserPayload> {
    let result;

    if (permanent) {
      result = await this.databaseService.user.delete({
        where: {
          id: id,
        },
      });
    } else {
      result = await this.databaseService.user.update({
        where: {
          id: id,
        },
        data: {
          role: {} as Prisma.JsonObject,
          employee: {
            update: {
              deletedAt: new Date(),
            },
          },
          guardian: {
            update: {
              deletedAt: new Date(),
            },
          },
          student: {
            update: {
              deletedAt: new Date(),
            },
          },
        },
      });
    }

    return {
      clientMutationId: clientMutationId,
      user: {
        id: result.id,
        email: result.email,
        name: result.name,
        role: result.role as unknown as JSON,
        birthDate: result.birthDate,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    };
  }
}
