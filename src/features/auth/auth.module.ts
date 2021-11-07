import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users';
import { Token } from './entities';
import { AuthController } from './controllers';
import { AuthService } from './services';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Token])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
