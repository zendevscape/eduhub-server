import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import { AuthModule } from './features/auth';
import { UsersModule } from './features/users';
import { ProductsModule } from './features/products';

@Module({
  imports: [CoreModule, AuthModule, UsersModule, ProductsModule],
})
export class AppModule {}
