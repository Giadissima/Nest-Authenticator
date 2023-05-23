import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { TestMiddleware } from 'src/test/test.middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule  implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TestMiddleware)
      .forRoutes('user');
  }
}
