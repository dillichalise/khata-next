import { db } from '@/db/lib';
import { differenceInDays } from 'date-fns';
import { TransactionType } from '@prisma/client';

export function getUserTransactionSummary() {
  return db.summary.getUserTransactionSummary();
}

export function getTransactionSummary() {
  return db.summary.getTransactionSummaryFromUserSummary();
}
export async function getUserSummary(userId: number) {
  const latestHistory = await db.summary.getLatestUserHistory(userId);
  // Early return if no history found
  if (!latestHistory || latestHistory.remainingLoan === null) {
    return {
      remainingLoan: 0.0,
      totalInterest: 0.0
    };
  }

  const {
    remainingLoan: principalAmount,
    interestAmount,
    transactionDate,
    description: transactionType
  } = latestHistory;

  const givenDate = new Date(transactionDate);
  const today = new Date();
  const daysDifference = differenceInDays(today, givenDate);

  const interestRate = 0.1;
  const interestUptoToday = principalAmount
    ? (+principalAmount * daysDifference * interestRate) / 365
    : 0.0;

  const interestAmountUptoLatest =
    transactionType === TransactionType.INTEREST ? 0 : Number(interestAmount);

  const totalInterest = interestUptoToday + interestAmountUptoLatest;

  return {
    remainingLoan: principalAmount ?? 0.0,
    totalInterest
  };
}
