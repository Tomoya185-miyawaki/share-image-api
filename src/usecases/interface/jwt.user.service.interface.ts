import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

export interface IJwtUserService {
  signJwtAsync(
    payload: Buffer | object,
    option: JwtSignOptions,
  ): Promise<string>;
  verifyAsync<T extends object = any>(
    token: string,
    options?: JwtVerifyOptions,
  ): Promise<T>;
}
