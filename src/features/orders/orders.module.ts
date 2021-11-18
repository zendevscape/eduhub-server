import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users';
import { FinancesModule } from '../finances';
import { ProductsModule } from '../products';
import { Order, OrderItem } from './entities';
import { OrdersController } from './controllers';
import { OrdersService } from './services';

@Module({
  imports: [
    UsersModule,
    FinancesModule,
    ProductsModule,
    TypeOrmModule.forFeature([Order, OrderItem]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
