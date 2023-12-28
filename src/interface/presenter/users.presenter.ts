import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/models/interface/user.interface';
import { IUsersService } from '../../usecases/interface/users.service.interface';
import { ConstantToken } from '../../enum/constant.token';

@Injectable()
export class UsersPresenter {
  constructor(
    @Inject(ConstantToken.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  async users(): Promise<User[]> {
    return await this.usersService.users();
  }
}
