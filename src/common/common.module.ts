import Joi from 'joi';
import { APP_FILTER } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLJSONObject } from 'graphql-scalars';
import { AnyExceptionFilter, HttpExceptionFilter } from './filters';
import { DatabaseService } from './services';

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
        })
        .unknown(true),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      resolvers: { JSON: GraphQLJSONObject },
    }),
  ],
  providers: [
    DatabaseService,
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class CommonModule {}
