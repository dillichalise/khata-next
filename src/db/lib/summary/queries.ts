import { prisma } from '@/db/lib/prisma';

export type TransactionSummary = {
  totalMonthlySavings: number;
  totalInterest: number;
  totalFine: number;
  totalCollectedAmount: number;
  totalLoanTaken: number;
  remainingAmount: number;
};

export async function getUserTransactionSummary() {
  return prisma.userSummary.findMany();
}

export async function getTransactionSummaryFromUserSummary(): Promise<TransactionSummary> {
  try {
    const userSummaries = await prisma.userSummary.findMany();

    const totalMonthlySavings = userSummaries.reduce(
      (sum, item) => sum + Number(item.totalSavings || 0),
      0
    );

    const totalInterest = userSummaries.reduce(
      (sum, item) => sum + Number(item.totalInterestPaid || 0),
      0
    );

    const totalFine = userSummaries.reduce(
      (sum, item) => sum + Number(item.totalFinePaid || 0),
      0
    );

    const totalLoanTaken = userSummaries.reduce(
      (sum, item) => sum + Number(item.remainingLoan || 0),
      0
    );

    const totalCollectedAmount =
      totalMonthlySavings + totalInterest + totalFine;
    const remainingAmount = totalCollectedAmount - totalLoanTaken;

    return {
      totalMonthlySavings,
      totalInterest,
      totalFine,
      totalCollectedAmount,
      totalLoanTaken,
      remainingAmount
    };
  } catch (error) {
    console.error('Error fetching transaction summary:', error);
    throw new Error('Failed to fetch transaction summary');
  }
}

export function getLatestUserHistory(userId: number) {
  return prisma.loanHistory.findFirst({
    where: { userId },
    orderBy: { transactionDate: 'desc' }
  });
}
