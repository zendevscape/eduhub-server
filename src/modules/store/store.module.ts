import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';
import { FinanceModule } from '../finance';
import { Order, OrderItem, Product } from './entities';
import { OrdersController, ProductsController } from './controllers';
import { OrdersService, ProductsService } from './services';

@Module({
  imports: [UserModule, FinanceModule, TypeOrmModule.forFeature([Order, OrderItem, Product])],
  providers: [OrdersService, ProductsService],
  controllers: [OrdersController, ProductsController],
})
export class StoreModule {}
