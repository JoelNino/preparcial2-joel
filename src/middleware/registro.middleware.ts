import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RegistroMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const userId = (req.headers['x-user-id'] as string) ?? 'ANONYMOUS';
    console.log(`[User: ${userId}] accedió a ${req.path} - ${req.method}`);
    next();
  }
}