import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
import { FinanceModule } from './modules/finance';
import { StoreModule } from './modules/store';

@Module({
  imports: [CommonModule, AuthModule, UserModule, FinanceModule, StoreModule],
})
export class AppModule {}
