import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  HttpCode,
  Body,
} from '@nestjs/common';
import { IUsersService } from '../../usecases/interface/users.service.interface';
import { ConstantToken } from '../../enum/constant.token';
import { PublicUser } from '../../domain/models/interface/user.interface';
import { SignInDto } from '../../interface/dto/user.dto';
import { SignInResponseDto } from '../../interface/dto/user.response.dto';

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

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.usersService.signIn(signInDto.email, signInDto.password);
  }
}
