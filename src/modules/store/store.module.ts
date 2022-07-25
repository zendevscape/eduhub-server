import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { FinanceModule } from '../finance';
import { OrdersController, ProductsController } from './controllers';
import { OrdersService, ProductsService } from './services';

@Module({
  imports: [UserModule, FinanceModule],
  providers: [OrdersService, ProductsService],
  controllers: [OrdersController, ProductsController],
})
export class StoreModule {}
