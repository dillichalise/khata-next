import { prisma } from '@/db/lib/prisma';
import { TGetUserListSchema } from '@/schema';

export async function getAllUsers(data: TGetUserListSchema) {
  return prisma.user.findMany({ where: data });
}

export async function getUserByClerkUserId(clerkUserId: string) {
  return prisma.user.findFirst({ where: { clerkUserId } });
}
