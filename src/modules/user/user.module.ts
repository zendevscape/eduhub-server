import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceModule } from '../finance';
import { Admin, Guardian, Seller, Student, User } from './entities';
import { AdminsService, GuardiansService, SellersService, StudentsService } from './services';
import {
  AdminsController,
  GuardiansController,
  SellersController,
  StudentsController,
} from './controllers';

@Module({
  imports: [
    forwardRef(() => FinanceModule),
    TypeOrmModule.forFeature([User, Admin, Guardian, Seller, Student]),
  ],
  providers: [AdminsService, GuardiansService, SellersService, StudentsService],
  controllers: [AdminsController, GuardiansController, SellersController, StudentsController],
  exports: [TypeOrmModule],
})
export class UserModule {}
