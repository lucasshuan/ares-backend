import { PrismaService } from '@/app/clients/prisma/prisma.service';
import { CreateGameDTO, UpdateGameDTO } from './game.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.game.findMany();
  }

  async findById(id: string) {
    return this.prisma.game.findUnique({ where: { id } });
  }

  async create(data: CreateGameDTO) {
    return this.prisma.game.create({
      data,
    });
  }

  async update({ id, ...data }: UpdateGameDTO) {
    return this.prisma.game.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.game.delete({ where: { id } });
  }
}
