import { TransactionAction, TransactionType } from '@/types/prisma-enums';

export const getTransactionTypeOptions = (actionValue: string | undefined) => {
  if (!actionValue) return [];
  const withdrawTypes = [TransactionType.LOAN];
  const depositTypes = [
    TransactionType.MONTHLY_SAVING,
    TransactionType.INTEREST,
    TransactionType.FINE,
    TransactionType.LOAN_RETURN
  ];

  const options =
    actionValue === TransactionAction.DEPOSIT ? depositTypes : withdrawTypes;

  return options.map((type) => ({
    label: type,
    value: type
  }));
};
