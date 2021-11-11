import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users';
import { Product } from './entities';
import { ProductsController } from './controllers';
import { ProductsService } from './services';

@Module({
  imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([Product])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
