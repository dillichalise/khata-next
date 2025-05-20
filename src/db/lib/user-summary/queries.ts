import { prisma } from '@/db/lib/prisma';

export async function getUserTransactionSummary() {
  return prisma.userSummary.findMany();
}
