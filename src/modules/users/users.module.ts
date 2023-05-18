import { Module } from '@nestjs/common';
import { UsersService } from './application/services/users.service';
import { UsersController } from './presentation/controllers/users.controller';
import { UsersProvider } from './infrastructure/provider/users.provider';
import { SharedModule } from '../../shared/shared.module';
import { UsersRepository } from './infrastructure/repository/users.repository';

@Module({
  controllers: [UsersController],
  imports: [
    SharedModule
  ],
  providers: [
    UsersProvider,
    UsersRepository,
    UsersService,
  ],
  exports: [
    UsersProvider,
    UsersRepository,
    UsersService,
  ]
})
export class UsersModule {}
