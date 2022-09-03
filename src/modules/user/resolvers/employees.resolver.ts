import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { validatePaginationParams } from '../../../common/utils';
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
import { EmployeesService } from '../services';

@Resolver(() => Employee)
export class EmployeesResolver {
  public constructor(private readonly employeesService: EmployeesService) {}

  @Query(() => Employee, { name: 'employee' })
  public async readEmployee(@Args() args: ReadEmployeeArgs) {
    return await this.employeesService.readEmployee(args);
  }

  @Query(() => EmployeeConnection, { name: 'employees' })
  public async readEmployees(@Args() args: ReadEmployeesArgs) {
    await validatePaginationParams(args);

    return await this.employeesService.readEmployees(args);
  }

  @Mutation(() => CreateEmployeePayload)
  public async createEmployee(@Args('input') input: CreateEmployeeInput) {
    return await this.employeesService.createEmployee(input);
  }

  @Mutation(() => UpdateEmployeePayload)
  public async updateEmployee(@Args('input') input: UpdateEmployeeInput) {
    return await this.employeesService.updateEmployee(input);
  }

  @Mutation(() => DeleteEmployeePayload)
  public async deleteEmployee(@Args('input') input: DeleteEmployeeInput) {
    return await this.employeesService.deleteEmployee(input);
  }
}
