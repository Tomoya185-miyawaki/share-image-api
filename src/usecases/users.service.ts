import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/models/interface/user.interface';
import { IUsersRepository } from '../infrastructure/interface/users.repository.interface';
import { ConstantToken } from '../enum/constant.token';
import { IUsersService } from './interface/users.service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(ConstantToken.USERS_REPOSITORY)
    private readonly repository: IUsersRepository,
  ) {}

  async users(): Promise<User[]> {
    return await this.repository.users();
  }
}
