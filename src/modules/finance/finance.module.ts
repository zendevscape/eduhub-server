import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';
import { PaymentGatewaysModule } from '../payment-gateways';
import { Balance, Payment, Transaction, Transfer } from './entities';
import { FinancesService } from './services';
import { FinancesController } from './controllers';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PaymentGatewaysModule,
    TypeOrmModule.forFeature([Balance, Transaction, Payment, Transfer]),
  ],
  providers: [FinancesService],
  controllers: [FinancesController],
  exports: [TypeOrmModule],
})
export class FinanceModule {}
