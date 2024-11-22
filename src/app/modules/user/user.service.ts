import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from './user.interface';
import { PrismaService } from '@/app/clients/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async list() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        players: true,
      },
    });
  }

  async update({ id, country, role }: UpdateUserDTO) {
    return this.prisma.user.update({
      where: { id },
      data: {
        country,
        role,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
