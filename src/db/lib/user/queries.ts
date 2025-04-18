import { prisma } from '@/db/lib/prisma';

export async function getUsers() {
  return prisma.user.findMany({});
}
