import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(user: User) {
    return this.prisma.user.create({ data: user });
  }
}
