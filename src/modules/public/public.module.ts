import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import JWTMiddleware from '../../middlewares/jwt.middleware';
import { ExternalModule } from '../external/external.module';
import { MonitoringService } from '../monitoring/monitoring.service';
import { AuthController } from './controllers/auth.controller';
import { PublicUserController } from './controllers/user.controller';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

const providers = [
  AuthService,
  UserService,
  MonitoringService,
];
const controllers = [
  PublicUserController,
  AuthController,
];

@Module({
  imports: [ExternalModule],
  controllers: [...controllers],
  providers: [...providers],
  exports: [...providers],
})
export class PublicModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JWTMiddleware)
      .exclude(
        { path: 'auth', method: RequestMethod.POST },
      )
      .forRoutes(...controllers);
  }
}
