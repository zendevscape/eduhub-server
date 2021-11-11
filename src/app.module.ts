import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import { AuthModule } from './features/auth';
import { UsersModule } from './features/users';
import { ProductsModule } from './features/products';
import { OrdersModule } from './features/orders';

@Module({
  imports: [CoreModule, AuthModule, UsersModule, ProductsModule, OrdersModule],
})
export class AppModule {}
