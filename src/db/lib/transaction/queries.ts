import { prisma } from '@/db/lib/prisma';
import { TListTransactionSchema } from '@/schema/transaction.schema';

export async function getAllTransactions({
  page,
  limit
}: TListTransactionSchema) {
  const skip = (page - 1) * limit;

  const transactions = await prisma.transaction.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });

  const total = await prisma.transaction.count();
  return { transactions, total };
}
