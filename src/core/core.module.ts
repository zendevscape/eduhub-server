import Joi from 'joi';
import { APP_FILTER } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../features/auth';
import { Order, OrderItem } from '../features/orders';
import { Product } from '../features/products';
import { Transaction } from '../features/transactions';
import { Admin, Guardian, Seller, Student, User } from '../features/users';
import { AnyExceptionFilter, HttpExceptionFilter, TypeORMErrorFilter } from './filters';
import { PasswordService, TokenService } from './services';

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
          TYPEORM_TYPE: Joi.string().required(),
          TYPEORM_HOST: Joi.string().required(),
          TYPEORM_PORT: Joi.number().required(),
          TYPEORM_USERNAME: Joi.string().required(),
          TYPEORM_PASSWORD: Joi.string().required(),
          TYPEORM_DATABASE: Joi.string().required(),
          TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
          TYPEORM_LOGGING: Joi.boolean().default(false),
        })
        .unknown(true),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: configService.get<any>('TYPEORM_TYPE'),
        host: configService.get<string>('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
        logging: configService.get<boolean>('TYPEORM_LOGGING'),
        entities: [
          Token,
          User,
          Admin,
          Guardian,
          Seller,
          Student,
          Transaction,
          Product,
          Order,
          OrderItem,
        ],
      }),
    }),
  ],
  providers: [
    PasswordService,
    TokenService,
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TypeORMErrorFilter,
    },
  ],
  exports: [PasswordService, TokenService],
})
export class CoreModule {}
