import { prisma } from '@/db/lib/prisma';
import { TransactionAction } from '@prisma/client';

export async function getAllSagarTransactions() {
  const [transactions, total, depositAgg, withdrawAgg] = await Promise.all([
    prisma.sagarTransaction.findMany({
      orderBy: { date: 'desc' }
    }),
    prisma.sagarTransaction.count(),
    prisma.sagarTransaction.aggregate({
      _sum: { amount: true },
      where: { type: TransactionAction.DEPOSIT }
    }),
    prisma.sagarTransaction.aggregate({
      _sum: { amount: true },
      where: { type: TransactionAction.WITHDRAW }
    })
  ]);

  const totalDeposit = Number(depositAgg._sum.amount ?? 0);
  const totalWithdraw = Number(withdrawAgg._sum.amount ?? 0);
  const difference = totalDeposit - totalWithdraw;

  return { transactions, total, difference };
}
