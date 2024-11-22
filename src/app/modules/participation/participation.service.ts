import { PrismaService } from '@/app/clients/prisma/prisma.service';
import { CreateParticipationDTO } from './participation.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParticipationService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(data: CreateParticipationDTO[]) {
    return this.prisma.participation.createMany({
      data,
    });
  }
}
