import { JwtSignOptions } from '@nestjs/jwt';

export interface IJwtUserService {
  signJwtAsync(
    payload: Buffer | object,
    option: JwtSignOptions,
  ): Promise<string>;
}
