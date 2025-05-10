import { TCreateTransactionSchema } from '@/schema/transaction.schema';
import { prisma } from '@/db/lib/prisma';
import { TransactionAction, TransactionType } from '@prisma/client';

export async function createTransaction(data: TCreateTransactionSchema) {
  return prisma.transaction.create({
    data: {
      ...data,
      type: data.type as TransactionType,
      action: data.action as TransactionAction,
      date: data.date as Date,
      userId: data.userId as number
    }
  });
}
