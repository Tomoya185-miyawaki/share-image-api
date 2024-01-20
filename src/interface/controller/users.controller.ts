import { Controller, Get, Inject } from '@nestjs/common';
import { User } from '../../domain/models/interface/user.interface';
import { IUsersService } from '../../usecases/interface/users.service.interface';
import { ConstantToken } from '../../enum/constant.token';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(ConstantToken.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Get()
  async users(): Promise<User[]> {
    return await this.usersService.users();
  }
}
