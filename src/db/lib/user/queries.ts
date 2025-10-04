import { prisma } from '@/db/lib/prisma';
import { TGetUserListSchema } from '@/schema';
import logger from '@/lib/winston';

export async function getAllUsers(data: TGetUserListSchema) {
  return prisma.user.findMany({ where: data });
}

export async function getUserByClerkUserId(clerkUserId: string) {
  return prisma.user.findFirst({ where: { clerkUserId } });
}

export async function getUserById(id: number) {
  return prisma.user.findFirst({ where: { id } });
}

export async function checkUserCount(): Promise<boolean> {
  try {
    await prisma.user.count();
    return true;
  } catch (error: any) {
    logger.error(
      `🔌 User count API failed --> ${JSON.stringify(error?.message)}`
    );
    return false;
  }
}
