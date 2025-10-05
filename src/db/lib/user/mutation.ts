import { prisma } from '@/db/lib/prisma';
import type { TCreateUserSchema, TUpdateUserSchema } from '@/schema';

export function createUser(user: TCreateUserSchema) {
  return prisma.user.create({ data: user });
}

export function updateUser(user: TUpdateUserSchema) {
  const { id, firstName, lastName, status } = user;
  return prisma.user.update({
    where: { id },
    data: { firstName, lastName, status }
  });
}
