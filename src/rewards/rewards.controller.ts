import { Controller, Post, Param, Get, Body } from '@nestjs/common';
import { RewardsService } from './rewards.service';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post('add')
  async addReward(
    @Body() body: { name: string; points: number; stock: number },
  ) {
    return this.rewardsService.addReward(body.name, body.points, body.stock);
  }

  @Get()
  async getRewards() {
    return this.rewardsService.getRewards();
  }

  @Get('history/:userId')
  async getRewardHistory(@Param('userId') userId: string) {
    return this.rewardsService.getRewardHistory(userId);
  }

  @Post('redeem/:userId/:rewardId')
  async redeemReward(
    @Param('userId') userId: string,
    @Param('rewardId') rewardId: string,
  ) {
    return this.rewardsService.redeemReward(userId, rewardId);
  }
}
