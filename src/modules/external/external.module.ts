import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';

const providers = [PrismaService];

@Module({
  imports: [],
  controllers: [],
  providers: providers,
  exports: providers,
})
export class ExternalModule {}
