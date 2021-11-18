import Xendit from 'xendit-node';
import { ConfigService } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users';
import { FinancesModule } from '../finances';
import { CallbacksModule } from '../callbacks';
import { PaymentGatewaysService, XenditService } from './services';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => FinancesModule), CallbacksModule],
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
