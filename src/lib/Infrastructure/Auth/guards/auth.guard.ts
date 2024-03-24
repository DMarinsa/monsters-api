// mutation.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from '../../../Domain/constants/roles';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const {
      req: { user },
    } = ctx.getContext();

    if (user.role !== Roles.Admin) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
