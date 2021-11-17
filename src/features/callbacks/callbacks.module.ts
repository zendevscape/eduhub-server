import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Callback } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Callback])],
  exports: [TypeOrmModule],
})
export class CallbacksModule {}
