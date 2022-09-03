import { forwardRef, Module } from '@nestjs/common';
import { FinanceModule } from '../finance';
import { EmployeesService, GuardiansService, StudentsService, UsersService } from './services';
import { EmployeesResolver, UsersResolver } from './resolvers';

@Module({
  imports: [forwardRef(() => FinanceModule)],
  providers: [
    UsersService,
    UsersResolver,
    EmployeesService,
    EmployeesResolver,
    GuardiansService,
    StudentsService,
  ],
})
export class UserModule {}
