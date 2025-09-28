import { TransactionType } from '@/types/prisma-enums';

export const getTransactionTypeColor = (type: TransactionType) => {
  switch (type) {
    case TransactionType.LOAN:
      return 'text-blue-400';
    case TransactionType.LOAN_RETURN:
      return 'text-yellow-200';
    case TransactionType.FINE:
      return 'text-red-200';
    case TransactionType.INTEREST:
      return 'text-blue-300';
    default:
      return 'text-white';
  }
};
