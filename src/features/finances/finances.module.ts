import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users';
import { TransactionsModule } from '../transactions';
import { PaymentGatewaysModule } from '../payment-gateways';
import { Balance, Payment, Transfer } from './entities';
import { FinancesService } from './services';
import { FinancesController } from './controllers';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TransactionsModule,
    PaymentGatewaysModule,
    TypeOrmModule.forFeature([Balance, Payment, Transfer]),
  ],
  providers: [FinancesService],
  controllers: [FinancesController],
  exports: [TypeOrmModule],
})
export class FinancesModule {}
