import { CreateMatchDTO, UpdateMatchDTO } from './match.interface';
import { MatchStatus } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/app/clients/prisma/prisma.service';
import { EloService } from '../elo/elo.service';

@Injectable()
export class MatchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eloService: EloService,
  ) {}

  async list() {
    return this.prisma.match.findMany();
  }

  async findById(id: string) {
    return this.prisma.match.findUnique({
      where: { id },
      include: {
        teams: {
          include: {
            participations: {
              include: {
                player: {
                  include: {
                    _count: {
                      select: {
                        participations: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async create({ teams, ...data }: CreateMatchDTO) {
    if (teams.length !== 2) throw new Error('Invalid number of teams');
    return this.prisma.$transaction(async (prisma) => {
      const match = await prisma.match.create({ data });
      await prisma.team.createMany({
        data: {
          ...teams.map((team) => ({ ...team, matchId: match.id })),
        },
      });
    });
  }

  async accept(id: string) {
    const match = await this.findById(id);
    if (!match) throw new Error('Match not found');

    return this.prisma.$transaction(async (prisma) => {
      const teams = match.teams.map((team) => {
        return {
          ...team,
          averageRating: this.eloService.teamAverageRating(team),
        };
      });

      for (let idx = 0; idx < teams.length; idx++) {
        const team = teams[idx];
        const opponentTeam = teams[idx === 0 ? 1 : 0];

        for (const participation of team.participations) {
          const matchesPlayedCount = participation.player._count.participations;
          const teamPlayersCount = team.participations.length;

          const rating = this.eloService.rating({
            rating1: participation.player.rating,
            rating2: opponentTeam.averageRating,
            score1: team.score,
            score2: opponentTeam.score,
            k: this.eloService.kFactor(matchesPlayedCount, teamPlayersCount),
          });

          await prisma.player.update({
            where: { id: participation.playerId },
            data: { rating },
          });
        }
      }
      await prisma.match.update({
        where: { id },
        data: {
          status: MatchStatus.ACCEPTED,
        },
      });
    });
  }

  async update({ id, ...data }: UpdateMatchDTO) {
    return this.prisma.match.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.match.delete({ where: { id } });
  }
}
