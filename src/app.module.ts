import { Module } from '@nestjs/common';
import { UsersModule } from './core/module/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
