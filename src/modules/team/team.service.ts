import { PrismaService } from '@/app/clients/prisma/prisma.service';
import { CreateTeamDTO } from './team.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(data: CreateTeamDTO[]) {
    return this.prisma.team.createMany({
      data,
    });
  }
}
