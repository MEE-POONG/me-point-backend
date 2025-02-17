import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post('add/:userId')
  async addPoints(
    @Param('userId') userId: string,
    @Body('amount') amount: number,
  ) {
    return this.pointsService.addPoints(userId, amount);
  }

  @Get('history/:userId')
  async getPointsHistory(@Param('userId') userId: string) {
    return this.pointsService.getPointsHistory(userId);
  }
}
