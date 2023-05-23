import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log("Il programma sta passando dal middleware")
    next();
  }
}
