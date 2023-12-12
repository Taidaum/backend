import { Injectable, NestMiddleware, HttpStatus, HttpException } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import * as Sentry from '@sentry/node';
import { DecodedJWT } from '../types/interfaces/jwt.interface';
import ERRORS from '../utils/errors';
import { AuthService } from '../modules/public/services/auth.service';

@Injectable()
export default class JWTMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.header('Authorization')?.replace('Bearer ', '');

      if (!authorization) {
        throw new HttpException(ERRORS.AUTH.JWT_MISSING, HttpStatus.UNAUTHORIZED);
      }

      let decoded: DecodedJWT = null;

      try {
        decoded = await this.authService.decodeJwtToken(authorization);
      } catch (e) {
        throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
      }

      const user = await this.authService.verifyAccess(decoded);

      if (user) {
        delete user.password;
        req.user = user;

        Sentry.configureScope((scope) => {
          scope.setUser({
            username: user.id.toString(),
            id: `${user.id}`,
            ip_address: (req.headers['x-forwarded-for'] || req.connection.remoteAddress).toString(),
          });
        });

        next();
      } else {
        throw new HttpException(ERRORS.AUTH.INVALID_ACCESS, HttpStatus.UNAUTHORIZED);
      }
    } catch (e) {
      Sentry.captureException(e);

      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
