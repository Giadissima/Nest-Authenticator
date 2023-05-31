/* eslint-disable @typescript-eslint/naming-convention */

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { UserAuth } from './user-auth';

/**
 * Use this annotation to retrieve the user information from the current
 * request
 *
 * @example of some controller method
 *   me(@User() user) {
 *      return user;
 *   }
 */
export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserAuth;
  },
);