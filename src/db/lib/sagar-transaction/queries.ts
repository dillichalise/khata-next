import { prisma } from '@/db/lib/prisma';

export async function getAllSagarTransactions() {
  const transactions = await prisma.sagarTransaction.findMany({
    orderBy: { date: 'desc' }
  });

  const total = await prisma.sagarTransaction.count();
  return { transactions, total };
}
