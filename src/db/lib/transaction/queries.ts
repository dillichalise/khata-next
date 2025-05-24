import { prisma } from '@/db/lib/prisma';
import {
  TListUserTransactionsSchema,
  TListTransactionSchema
} from '@/schema/transaction.schema';
import { TransactionType } from '@prisma/client';

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

export async function getUserTransactions({
  page,
  limit,
  userId,
  type
}: TListUserTransactionsSchema) {
  const skip = (page - 1) * limit;
  const filters = {
    userId,
    type:
      type === TransactionType.MONTHLY_SAVING
        ? TransactionType.MONTHLY_SAVING
        : {
            in: [
              TransactionType.LOAN,
              TransactionType.INTEREST,
              TransactionType.LOAN_RETURN
            ]
          }
  };

  const transactions = await prisma.transaction.findMany({
    where: filters,
    skip,
    take: limit,
    orderBy: { date: 'desc' }
  });

  const total = await prisma.transaction.count({
    where: filters
  });
  return { transactions, total };
}

export async function getUserLoanTransactions({
  page,
  limit,
  userId
}: TListUserTransactionsSchema) {
  const skip = (page - 1) * limit;

  const [loanHistoryData, total] = await Promise.all([
    prisma.loanHistory.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { transactionDate: 'desc' }
    }),
    prisma.loanHistory.count({ where: { userId } })
  ]);

  return { loanHistoryData, total };
}
