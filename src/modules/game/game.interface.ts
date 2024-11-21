import { Game } from '@prisma/client';

export type CreateGameDTO = {
  name: string;
  description?: string;
  steamUrl?: string;
  thumbnailUrl?: string;
  backgroundUrl?: string;
};

export type UpdateGameDTO = Pick<Game, 'id'> & Partial<CreateGameDTO>;
