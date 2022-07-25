import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user';
import { PaymentGatewaysModule } from '../payment-gateways';
import { FinancesService } from './services';
import { FinancesController } from './controllers';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PaymentGatewaysModule,
  ],
  providers: [FinancesService],
  controllers: [FinancesController],
})
export class FinanceModule {}
