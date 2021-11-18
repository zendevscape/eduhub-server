import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users';
import { PaymentGatewaysModule } from '../payment-gateways';
import { Balance, Payment, Transaction, Transfer } from './entities';
import { FinancesService } from './services';
import { FinancesController } from './controllers';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PaymentGatewaysModule,
    TypeOrmModule.forFeature([Balance, Transaction, Payment, Transfer]),
  ],
  providers: [FinancesService],
  controllers: [FinancesController],
  exports: [TypeOrmModule],
})
export class FinancesModule {}
