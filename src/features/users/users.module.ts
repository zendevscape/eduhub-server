import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products';
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
    TypeOrmModule.forFeature([User, Admin, Guardian, Seller, Student]),
    RouterModule.register([
      {
        path: 'sellers/:sellerId',
        module: ProductsModule,
      },
    ]),
  ],
  providers: [AdminsService, GuardiansService, SellersService, StudentsService],
  controllers: [AdminsController, GuardiansController, SellersController, StudentsController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
