import { prisma } from '@/db/lib/prisma';

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function getUserByClerkUserId(clerkUserId: string) {
  return prisma.user.findFirst({ where: { clerkUserId } });
}
