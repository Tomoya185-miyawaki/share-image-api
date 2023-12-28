import { Controller, Get } from '@nestjs/common';
import { User } from '../../domain/models/interface/user.interface';
import { UsersPresenter } from '../../interface/presenter/users.presenter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersPresenter: UsersPresenter) {}

  @Get()
  async users(): Promise<User[]> {
    return await this.usersPresenter.users();
  }
}
