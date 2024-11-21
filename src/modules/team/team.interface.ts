interface Participation {
  playerId: string;
  info: unknown;
}

export type CreateTeamDTO = {
  matchId: string;
  score: number;
  participations: Participation[];
};
