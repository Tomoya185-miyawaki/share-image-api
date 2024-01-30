import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { IJwtUserService } from './interface/jwt.user.service.interface';

@Injectable()
export class JwtUserService extends JwtService implements IJwtUserService {
  async signJwtAsync(
    payload: Buffer | object,
    options: JwtSignOptions,
  ): Promise<string> {
    return await super.signAsync(payload, options);
  }

  async verifyAsync<T extends object = any>(
    token: string,
    options?: JwtVerifyOptions,
  ): Promise<T> {
    return await super.verifyAsync(token, options);
  }
}
