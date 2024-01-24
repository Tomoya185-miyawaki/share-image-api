import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../usecases/users.service';
import { User, PublicUser } from '../../domain/models/interface/user.interface';
import { ConstantToken } from '../../enum/constant.token';
import { it } from 'node:test';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;

  const expectUsersResponse: PublicUser[] = [
    {
      id: 1,
      name: 'test',
      email: 'sample@sample.com',
    },
  ];

  beforeEach(async () => {
    fakeUsersService = {
      users: () => {
        return Promise.resolve([
          {
            id: 1,
            name: 'test',
            email: 'sample@sample.com',
            password: 'password',
          } as User,
        ]);
      },
      findUserByEmail: () => {
        return Promise.resolve({
          id: 1,
          name: 'test',
          email: 'sample@sample.com',
          password: 'password',
        } as User);
      },
      signIn: () => {
        return Promise.resolve({
          access_token: 'test-access-token',
        });
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: ConstantToken.USERS_SERVICE,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('Controllerが定義されているか', () => {
    expect(controller).toBeDefined();
  });

  it('すべてのユーザーを取得する', async () => {
    const users = await controller.users();
    expect(users.length).toEqual(1);
    expect(users).toEqual(expectUsersResponse);
  });

  it('ログイン成功後にアクセストークンが返ってくること', async () => {
    const signInDto = {
      email: 'sample@sample.com',
      password: 'password',
    };
    const token = await controller.signIn(signInDto);
    console.log(token);
  });
});
