import { prisma } from '@/db/lib/prisma';

export async function getUsers() {
  return prisma.user.findMany({});
}

export async function getUserByClerkUserId(userId: string) {
  return prisma.user.findFirst({ where: { userId } });
}
