import { Participation } from '@prisma/client';

export type CreateParticipationDTO = Pick<
  Participation,
  'info' | 'playerId' | 'teamId'
>;
