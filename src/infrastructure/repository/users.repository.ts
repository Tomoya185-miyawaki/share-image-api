import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma.service';
import { User } from '../../domain/models/interface/user.interface';
import { IUsersRepository } from '../interface/users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
