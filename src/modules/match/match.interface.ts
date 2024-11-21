import { Match } from '@prisma/client';
import { CreateTeamDTO } from '../team/team.interface';

type BaseCreateMatchDTO = Pick<
  Match,
  | 'status'
  | 'screenshotUrl'
  | 'streamUrl'
  | 'tourneyScheduleId'
  | 'creatorId'
  | 'gameId'
>;

export type CreateMatchDTO = {
  teams: CreateTeamDTO[];
} & BaseCreateMatchDTO;

export type UpdateMatchDTO = Pick<Match, 'id'> & Partial<BaseCreateMatchDTO>;
