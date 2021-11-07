import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin, Guardian, Seller, Student, User } from './entities';
import { AdminsService, GuardiansService, SellersService, StudentsService } from './services';
import {
  AdminsController,
  GuardiansController,
  SellersController,
  StudentsController,
} from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin, Guardian, Seller, Student])],
  providers: [AdminsService, GuardiansService, SellersService, StudentsService],
  controllers: [AdminsController, GuardiansController, SellersController, StudentsController],
})
export class UsersModule {}
