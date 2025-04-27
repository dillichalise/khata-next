import { prisma } from '@/db/lib/prisma';
import type { TCreateUserSchema } from '@/schema';

export function createUser(user: TCreateUserSchema) {
  return prisma.user.create({ data: user });
}
