import Joi from 'joi';
import { APP_FILTER } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnyExceptionFilter, HttpExceptionFilter } from './filters';
import { DatabaseService, PasswordService } from './services';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object()
        .keys({
          NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
          PORT: Joi.number().default(3000),
          JWT_SECRET: Joi.string().required(),
          JWT_ACCESS_TOKEN_EXPIRATION: Joi.number().default(24),
          JWT_REFRESH_TOKEN_EXPIRATION: Joi.number().default(30),
          XENDIT_API_KEY: Joi.string().required(),
          XENDIT_CALLBACK_TOKEN: Joi.string().required(),
        })
        .unknown(true),
    }),
  ],
  providers: [
    DatabaseService,
    PasswordService,
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [PasswordService],
})
export class CommonModule {}
