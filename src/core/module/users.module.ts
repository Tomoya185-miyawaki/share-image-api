import { Module } from '@nestjs/common';
import { UsersService } from '../../usecases/users.service';
import { UsersController } from '../../interface/controller/users.controller';
import { UsersRepository } from '../../infrastructure/repository/users.repository';
import { PrismaModule } from '../../core/module/prisma.module';
import { ConstantToken } from '../../enum/constant.token';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: ConstantToken.USERS_SERVICE,
      useClass: UsersService,
    },
    {
      provide: ConstantToken.USERS_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  imports: [PrismaModule],
})
export class UsersModule {}
