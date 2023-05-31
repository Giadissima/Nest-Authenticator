import {
  CustomDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport'; // perché non me lo importa correttamente?
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

/**
 * Use this annotation whenever there's the need to tell
 * passport that a specific Controller or Method is public and
 * shall not be validated using the Authorization Header
 */
export const Public = ():CustomDecorator<string> => SetMetadata('isPublic', true);

@Injectable()
export class JwtAuthGuard extends AuthGuard('JwtStrategy') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [ // reflector is taking isPublic metadata
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context); // TODO ?
  }
}