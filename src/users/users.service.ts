import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/infrastructure/repository/users.repository';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async user(id: number): Promise<User | null> {
    return this.repository.user(id);
  }

  async users(): Promise<User[]> {
    return this.repository.users();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.repository.createUser(data);
  }
}
