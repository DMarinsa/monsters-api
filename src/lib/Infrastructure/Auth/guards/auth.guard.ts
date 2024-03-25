// mutation.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from '../../../Domain/constants/roles';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
export const SECRET_KEY = 'monsters-api';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: SECRET_KEY,
        algorithms: ['HS256'],
      });

      if (payload?.role !== Roles.Admin) {
        return false;
      }

      return true;
    } catch (error) {
      Logger.error({ message: error.message, stack: error.stack });

      return false;
    }
  }

  private extractTokenFromHeader(req: Request): string {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
