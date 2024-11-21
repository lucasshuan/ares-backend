import { Player, Prisma, Region } from "@prisma/client";

export interface ListPlayersDTO {
  username?: string;
  gameName?: string;
  region?: Region;
  country?: string;
  order?: Prisma.SortOrder;
  skip?: number;
  take?: number;
}

export type CreatePlayerDTO = Pick<
  Player,
  "username" | "gameId" | "userId" | "rating"
>;

export type UpdatePlayerDTO = Pick<Player, "id"> & Partial<CreatePlayerDTO>;
