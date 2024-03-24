// mutation.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from '../../../Domain/constants/roles';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const {
      req: { user },
    } = ctx.getContext();

    if (user?.role !== Roles.Admin) {
      return false;
    }

    return true;
  }
}
