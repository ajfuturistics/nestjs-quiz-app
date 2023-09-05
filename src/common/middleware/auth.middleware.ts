import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthException } from '../exceptions/auth.exception';

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      throw new AuthException();
    }
    next();
  }
}
