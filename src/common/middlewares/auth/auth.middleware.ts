
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['auth-user'];

    if (!token || typeof token !== 'string') {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
      const decoded = jwt.verify(token, 'key');

      if (
        typeof decoded === 'string' ||
        !decoded ||
        !('userId' in decoded)
      ) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      (req as any).userId = decoded.userId;

      next();
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
