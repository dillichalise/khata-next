import { TCreateTransactionSchema } from '@/schema/transaction.schema';
import { prisma } from '@/db/lib/prisma';
import { TransactionType } from '@prisma/client';

export async function createCombinedTransactions(
  data: TCreateTransactionSchema
) {
  const { interestAmount, loanReturnAmount, ...resData } = data;

  if (data.type === TransactionType.INTEREST && interestAmount < data.amount) {
    return prisma.$transaction(async (tx) => {
      const interestSaveData = {
        ...resData,
        type: TransactionType.INTEREST,
        amount: interestAmount
      };
      await tx.transaction.create({ data: interestSaveData });

      const loanReturnSaveData = {
        ...resData,
        type: TransactionType.LOAN_RETURN,
        amount: loanReturnAmount
      };
      await tx.transaction.create({ data: loanReturnSaveData });
    });
  } else {
    return prisma.transaction.create({ data: resData });
  }
}
