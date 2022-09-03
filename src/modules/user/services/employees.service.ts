import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../../../common/services';
import { getPaginationParams, hashPassword } from '../../../common/utils';
import {
  CreateEmployeeInput,
  DeleteEmployeeInput,
  ReadEmployeeArgs,
  ReadEmployeesArgs,
  UpdateEmployeeInput,
} from '../dto';
import {
  CreateEmployeePayload,
  DeleteEmployeePayload,
  Employee,
  EmployeeConnection,
  UpdateEmployeePayload,
} from '../entities';

@Injectable()
export class EmployeesService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async createEmployee({
    clientMutationId,
    id,
    email,
    password,
    name,
    birthDate,
    active,
  }: CreateEmployeeInput): Promise<CreateEmployeePayload> {
    let user;

    if (id) {
      user = await this.databaseService.user.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
    }

    const result = await this.databaseService.user.upsert({
      where: {
        id: id,
      },
      create: {
        email: email as string,
        password: await hashPassword(password as string),
        role: { employee: true } as Prisma.JsonObject,
        name: name as string,
        birthDate: birthDate as Date,
        employee: {
          create: {
            active: active,
          },
        },
      },
      update: {
        email: email,
        password: await hashPassword(password as string),
        role: ((user?.role as Prisma.JsonObject)['employee'] = true),
        name: name,
        birthDate: birthDate,
        employee: {
          create: {
            active: active,
          },
        },
      },
      include: {
        employee: true,
      },
    });

    return {
      clientMutationId: clientMutationId,
      employee: {
        id: result.id,
        employeeId: result.employee?.id as string,
        email: result.email,
        name: result.name,
        birthDate: result.birthDate,
        active: result.employee?.active as boolean,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        deletedAt: result.employee?.deletedAt as Date | null,
      },
    };
  }

  public async readEmployee({ id }: ReadEmployeeArgs): Promise<Employee> {
    const result = await this.databaseService.employeeUsers.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    return {
      id: result.id,
      employeeId: result.employeeId,
      email: result.email,
      name: result.name,
      birthDate: result.birthDate,
      active: result.active,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      deletedAt: result.deletedAt,
    };
  }

  public async readEmployees({
    first,
    last,
    after,
    before,
    where,
  }: ReadEmployeesArgs): Promise<EmployeeConnection> {
    const { limit, cursor } = await getPaginationParams({
      first,
      last,
      after,
      before,
    });

    const results = await this.databaseService.employeeUsers.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: {
        id: cursor,
      },
      where: {
        AND: [
          {
            OR: [
              {
                name: {
                  contains: where?.nameContains,
                },
              },
              {
                name: {
                  startsWith: where?.nameStartsWith,
                },
              },
              {
                name: {
                  endsWith: where?.nameEndsWith,
                },
              },
            ],
          },
          {
            OR: [
              {
                email: {
                  contains: where?.emailContains,
                },
              },
              {
                email: {
                  startsWith: where?.emailStartsWith,
                },
              },
              {
                email: {
                  endsWith: where?.emailEndsWith,
                },
              },
            ],
          },
          {
            OR: [
              {
                createdAt: {
                  lt: where?.createdBefore,
                },
              },
              {
                createdAt: {
                  gt: where?.createdAfter,
                },
              },
            ],
          },
          {
            OR: [
              {
                updatedAt: {
                  lt: where?.updatedBefore,
                },
              },
              {
                updatedAt: {
                  gt: where?.updatedAfter,
                },
              },
            ],
          },
        ],
      },
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

  public async updateEmployee({
    clientMutationId,
    id,
    name,
    email,
    password,
  }: UpdateEmployeeInput): Promise<UpdateEmployeePayload> {
    const result = await this.databaseService.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        password: password ? await hashPassword(password) : undefined,
      },
      include: {
        employee: true,
      },
    });

    return {
      clientMutationId: clientMutationId,
      employee: {
        id: result.id,
        employeeId: result.employee?.id as string,
        name: result.name,
        email: result.email,
        birthDate: result.birthDate,
        active: result.employee?.active as boolean,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        deletedAt: result.employee?.deletedAt as Date | null,
      },
    };
  }

  public async deleteEmployee({
    clientMutationId,
    id,
    permanent,
  }: DeleteEmployeeInput): Promise<DeleteEmployeePayload> {
    const user = await this.databaseService.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    const result = await this.databaseService.user.update({
      where: {
        id: id,
      },
      data: {
        role: permanent ? ((user.role as Prisma.JsonObject)['employee'] = false) : undefined,
        employee: {
          delete: permanent,
          update: {
            deletedAt: !permanent ? new Date() : undefined,
          },
        },
      },
      include: {
        employee: true,
      },
    });

    return {
      clientMutationId: clientMutationId,
      employee: {
        id: result.id,
        employeeId: result.employee?.id as string,
        email: result.email,
        name: result.name,
        birthDate: result.birthDate,
        active: result.employee?.active as boolean,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        deletedAt: result.employee?.deletedAt as Date | null,
      },
    };
  }
}
