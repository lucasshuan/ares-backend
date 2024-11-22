import { Match, MatchOutcome } from '@prisma/client';

type BaseCreateMatchDTO = Pick<
  Match,
  | 'status'
  | 'screenshotUrl'
  | 'streamUrl'
  | 'tourneyScheduleId'
  | 'creatorId'
  | 'gameId'
  | 'gameRegionId'
>;

export type CreateTeamDTO = {
  outcome: MatchOutcome;
  score: number;
  players: {
    id: string;
  }[];
};

export type CreateMatchDTO = {
  teams: CreateTeamDTO[];
} & BaseCreateMatchDTO;

export type UpdateMatchDTO = Pick<Match, 'id'> & Partial<BaseCreateMatchDTO>;
