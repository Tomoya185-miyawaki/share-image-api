import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConstantToken } from '../../enum/constant.token';
import { IJwtUserService } from '../../usecases/interface/jwt.user.service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(ConstantToken.JWT_USER_SERVICE)
    private readonly jwtUserService: IJwtUserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtUserService.verifyAsync(token, {
        secret: process.env.JWT_TOKEN,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
