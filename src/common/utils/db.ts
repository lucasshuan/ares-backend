import { Prisma } from '@prisma/client';

export const insensitiveSearch = (query?: string) =>
  query ? { contains: query, mode: Prisma.QueryMode.insensitive } : undefined;
