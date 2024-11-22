import { Player, Prisma } from '@prisma/client';

export interface ListPlayersDTO {
  username?: string;
  gameName?: string;
  regionId?: string;
  country?: string;
  order?: Prisma.SortOrder;
  skip?: number;
  take?: number;
}

export type CreatePlayerDTO = Pick<
  Player,
  'username' | 'gameId' | 'regionId' | 'userId' | 'rating'
>;

export type UpdatePlayerDTO = Pick<Player, 'id'> & Partial<CreatePlayerDTO>;
