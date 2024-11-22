import { User } from '@prisma/client';

export type UpdateUserDTO = Pick<User, 'id' | 'country' | 'role'>;
