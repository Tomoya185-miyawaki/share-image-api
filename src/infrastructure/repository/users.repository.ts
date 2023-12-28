import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma.service';
import { User } from '@prisma/client';
import { IUsersRepository } from '../interface/users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
