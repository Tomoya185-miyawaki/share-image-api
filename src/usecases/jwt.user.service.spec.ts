import { Test, TestingModule } from '@nestjs/testing';
import { JwtUserService } from './jwt.user.service';

describe('JwtUserService', () => {
  let fakeJwtUserService: Partial<JwtUserService>;

  beforeEach(async () => {
    fakeJwtUserService = {
      signAsync: () => {
        return Promise.resolve('test-jwt-token');
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // JWTサービスをmockで上書きする
        {
          provide: JwtUserService,
          useValue: fakeJwtUserService,
        },
      ],
    }).compile();

    fakeJwtUserService = module.get<JwtUserService>(JwtUserService);
  });

  it('Serviceが定義されているか', () => {
    expect(fakeJwtUserService).toBeDefined();
  });

  it('JWTトークンが返却されること', async () => {
    const options = {
      secret: 'test',
      expiresIn: '1h',
    };
    const payload = { sub: 1, username: 'テスト' };

    const result = await fakeJwtUserService.signAsync(payload, options);
    expect(result).toEqual('test-jwt-token');
  });
});
