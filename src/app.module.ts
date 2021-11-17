import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import { AuthModule } from './features/auth';
import { UsersModule } from './features/users';
import { TransactionsModule } from './features/transactions';
import { FinancesModule } from './features/finances';
import { ProductsModule } from './features/products';
import { OrdersModule } from './features/orders';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    UsersModule,
    TransactionsModule,
    FinancesModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
