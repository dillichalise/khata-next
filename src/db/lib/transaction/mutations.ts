import { TCreateTransactionSchema } from '@/schema/transaction.schema';
import { prisma } from '@/db/lib/prisma';

export async function createTransaction(data: TCreateTransactionSchema) {
  return prisma.transaction.create({ data });
}
