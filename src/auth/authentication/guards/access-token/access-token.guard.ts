import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/auth.constants';
import jwtConfig from 'src/auth/config/jwt.config';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtConfigrations: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'Whoa there! It looks like you forgot to bring your token. Please log in to join the fun!',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, this.jwtConfigrations);
      request[REQUEST_USER_KEY] = payload;
      console.log('request[REQUEST_USER_KEY]: ', request[REQUEST_USER_KEY]);
    } catch (error) {
      throw new UnauthorizedException(
        'Oops! That token didn’t pass the bouncer. Please log in to get a new one!',
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.headers.authorization?.split(' ')[1];
    return token;
  }
}
