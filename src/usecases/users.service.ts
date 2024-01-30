import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../domain/models/interface/user.interface';
import { IUsersRepository } from '../infrastructure/interface/users.repository.interface';
import { ConstantToken } from '../enum/constant.token';
import { IUsersService } from './interface/users.service.interface';
import { IJwtUserService } from './interface/jwt.user.service.interface';
import { SignInResponseDto } from '../interface/dto/user.response.dto';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(ConstantToken.USERS_REPOSITORY)
    private readonly repository: IUsersRepository,
    @Inject(ConstantToken.JWT_USER_SERVICE)
    private readonly jwtUserService: IJwtUserService,
  ) {}

  async users(): Promise<User[]> {
    return await this.repository.users();
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }

  async signIn(email: string, password: string): Promise<SignInResponseDto> {
    const user = await this.findUserByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtUserService.signJwtAsync(payload, {
        secret: process.env.JWT_TOKEN,
        expiresIn: '1h',
      }),
    };
  }
}
