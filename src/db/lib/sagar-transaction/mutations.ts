import { prisma } from '@/db/lib/prisma';
import { TCreateSagarTransactionSchema } from '@/schema/sagar-transaction.schema';

export async function createSagarTransaction(
  data: TCreateSagarTransactionSchema
) {
  return prisma.sagarTransaction.create({ data });
}
