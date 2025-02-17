import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class PointsService {
  constructor(private readonly prisma: PrismaService) {}

  async addPoints(userId: string, amount: number) {
    const updateResult = await this.prisma.user.update({
      where: { id: userId },
      data: { points: { increment: amount } },
    });

    // Create a history record
    await this.prisma.pointsHistory.create({
      data: {
        userId: userId,
        amount: amount,
        timestamp: new Date(),
      },
    });

    return updateResult;
  }

  async getPointsHistory(userId: string) {
    return this.prisma.pointsHistory.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });
  }
}
