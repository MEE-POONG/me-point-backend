import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';

@Module({
  providers: [PointsService],
  controllers: [PointsController],
})
export class PointsModule {}
