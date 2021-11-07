import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import { AuthModule } from './features/auth';
import { UsersModule } from './features/users';

@Module({
  imports: [CoreModule, AuthModule, UsersModule],
})
export class AppModule {}
