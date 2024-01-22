import { Controller, Get, Inject } from '@nestjs/common';
import { IUsersService } from '../../usecases/interface/users.service.interface';
import { ConstantToken } from '../../enum/constant.token';
import { PublicUser } from '../../domain/models/interface/user.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(ConstantToken.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Get()
  async users(): Promise<PublicUser[]> {
    const users = await this.usersService.users();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
}
