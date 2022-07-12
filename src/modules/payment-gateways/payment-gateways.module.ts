import Xendit from 'xendit-node';
import { ConfigService } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from '../../common';
import { UserModule } from '../user';
import { FinanceModule } from '../finance';
import { PaymentGatewaysService, XenditService } from './services';

@Module({
  imports: [CommonModule, forwardRef(() => UserModule), forwardRef(() => FinanceModule)],
  providers: [
    {
      inject: [ConfigService],
      provide: Xendit,
      useFactory: (configService: ConfigService) => {
        return new Xendit({
          secretKey: configService.get<string>('XENDIT_API_KEY') as string,
        });
      },
    },
    {
      provide: PaymentGatewaysService,
      useClass: XenditService,
    },
  ],
  exports: [PaymentGatewaysService],
})
export class PaymentGatewaysModule {}
