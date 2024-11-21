import { CreateClanDTO, ListClansDTO, UpdateClanDTO } from './clan.interface';
import { playerService } from '../player/player.service';
import { insensitiveSearch } from '@/common/utils/db';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/app/clients/prisma/prisma.service';

@Injectable()
export class ClanService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.clan.findUnique({
      where: { id },
      include: {
        members: true,
        game: true,
        owner: true,
      },
    });
  }

  async list({ gameId, gameName, order, skip, take }: ListClansDTO) {
    return this.prisma.clan.findMany({
      where: {
        game: {
          id: gameId,
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

  async create(data: CreateClanDTO) {
    const owner = await playerService.findById(data.ownerId);
    if (!owner) throw new Error('Owner not found');
    return this.prisma.clan.create({
      data: {
        rating: owner?.rating,
        members: {
          create: {
            playerId: data.ownerId,
          },
        },
        ...data,
      },
    });
  }

  async update({ id, ...data }: UpdateClanDTO) {
    return this.prisma.clan.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.clan.delete({ where: { id } });
  }
}
