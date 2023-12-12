import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { AppController } from './app.controller';
import { ExternalModule } from './modules/external/external.module';
import { PublicModule } from './modules/public/public.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    CacheModule.register({ isGlobal: true, ttl: 60 * 25 }),
    ExternalModule,
    PublicModule,
    MonitoringModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
