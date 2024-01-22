import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../domain/models/interface/user.interface';
import { ConstantToken } from '../enum/constant.token';
import { UsersRepository } from '../infrastructure/repository/users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let fakeUsersRepository: Partial<UsersRepository>;
  const expectUsersResponse: User[] = [
    {
      id: 1,
      name: 'test',
      email: 'sample@sample.com',
      password: 'password',
    },
  ];

  beforeEach(async () => {
    fakeUsersRepository = {
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
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: ConstantToken.USERS_REPOSITORY,
          useValue: fakeUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('Controllerが定義されているか', () => {
    expect(service).toBeDefined();
  });

  it('すべてのユーザーを取得する', async () => {
    const users = await service.users();
    expect(users.length).toEqual(1);
    expect(users).toEqual(expectUsersResponse);
  });
});
