import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RewardsService {
  constructor(private readonly prisma: PrismaService) {}

  async addReward(name: string, points: number, stock: number) {
    return this.prisma.reward.create({
      data: {
        name,
        points,
        stock,
      },
    });
  }

  async getRewards() {
    return this.prisma.reward.findMany();
  }

  async redeemReward(userId: string, rewardId: string) {
    const reward = await this.prisma.reward.findUnique({
      where: { id: rewardId },
    });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!reward || !user || user.points < reward.points || reward.stock <= 0) {
      throw new Error('Cannot redeem reward');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { points: { decrement: reward.points } },
    });

    await this.prisma.reward.update({
      where: { id: rewardId },
      data: { stock: { decrement: 1 } },
    });

    // Log the reward redemption
    await this.logRewardRedemption(userId, rewardId);

    return {
      message: 'Reward redeemed successfully',
      user: await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, points: true },
      }),
      reward: await this.prisma.reward.findUnique({
        where: { id: rewardId },
        select: { id: true, name: true, points: true, stock: true },
      }),
    };
  }

  private async logRewardRedemption(userId: string, rewardId: string) {
    await this.prisma.rewardHistory.create({
      data: {
        userId,
        rewardId,
        redeemedAt: new Date(),
      },
    });
  }

  async getRewardHistory(userId: string) {
    return this.prisma.rewardHistory.findMany({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        reward: { select: { id: true, name: true, points: true } },
      },
    });
  }
}
