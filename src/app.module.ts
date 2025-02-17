import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PointsModule } from './points/points.module';
import { RewardsModule } from './rewards/rewards.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, PointsModule, RewardsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
