import { insensitiveSearch } from '@/common/utils/db';
import {
  CreatePlayerDTO,
  ListPlayersDTO,
  UpdatePlayerDTO,
} from './player.interface';
import { PrismaService } from '@/app/clients/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  async list({
    gameName,
    country,
    username,
    order,
    skip,
    take,
  }: ListPlayersDTO = {}) {
    return this.prisma.player.findMany({
      where: {
        username: insensitiveSearch(username),
        user: {
          country: insensitiveSearch(country),
        },
        game: {
          name: insensitiveSearch(gameName),
        },
      },
      orderBy: {
        rating: order,
      },
      skip,
      take,
    });
  }

  async findById(id: string) {
    return this.prisma.player.findUnique({
      where: { id },
      include: {
        user: true,
        game: true,
        clanMemberships: true,
        participations: {
          include: {
            team: {
              include: {
                match: true,
              },
            },
          },
        },
        tourneyRosters: true,
      },
    });
  }

  async create(data: CreatePlayerDTO) {
    return this.prisma.player.create({
      data,
    });
  }

  async update({ id, ...data }: UpdatePlayerDTO) {
    return this.prisma.player.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.player.delete({ where: { id } });
  }
}
