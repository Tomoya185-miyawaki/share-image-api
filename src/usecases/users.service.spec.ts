import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../domain/models/interface/user.interface';
import { ConstantToken } from '../enum/constant.token';
import { JwtUserService } from '../usecases/jwt.user.service';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository;
  let fakeJwtUserService: Partial<JwtUserService>;

  const fakeUsersRepository = () => ({
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
    findUserByEmail: jest.fn(),
  });
  const testUser: User = {
    id: 1,
    name: 'test',
    email: 'sample@sample.com',
    password: 'password',
  };
  const expectUsersResponse: User[] = [testUser];
  const expectFindUserByEmailResponse: User = testUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: ConstantToken.USERS_REPOSITORY,
          useFactory: fakeUsersRepository,
        },
        {
          provide: ConstantToken.JWT_USER_SERVICE,
          useValue: fakeJwtUserService,
        },
      ],
    }).compile();

    usersRepository = module.get(ConstantToken.USERS_REPOSITORY);
    service = module.get<UsersService>(UsersService);
  });

  it('Serviceが定義されているか', () => {
    expect(service).toBeDefined();
  });

  it('すべてのユーザーを取得する', async () => {
    const users = await service.users();
    expect(users.length).toEqual(1);
    expect(users).toEqual(expectUsersResponse);
  });

  it('emailに紐づくユーザーを取得する', async () => {
    usersRepository.findUserByEmail.mockResolvedValue(testUser);
    const user = await service.findUserByEmail('sample@sample.com');
    expect(user).toEqual(expectFindUserByEmailResponse);
  });

  it('emailに紐づくユーザーが取得できない場合は例外をthrowする', async () => {
    usersRepository.findUserByEmail.mockReturnValue(null);
    await expect(
      service.findUserByEmail('notfound@sample.com'),
    ).rejects.toThrow(new BadRequestException());
  });
});
