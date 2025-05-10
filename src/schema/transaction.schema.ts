import { z } from 'zod';
import { userSchema } from '@/schema/user.schema';
import { TransactionAction, TransactionType } from '@prisma/client';

const TransactionActionEnum = z.enum([
  TransactionAction.DEPOSIT,
  TransactionAction.WITHDRAW
]);
const TransactionTypeEnum = z.enum([
  TransactionType.LOAN,
  TransactionType.INTEREST,
  TransactionType.LOAN_RETURN,
  TransactionType.FINE,
  TransactionType.MONTHLY_SAVING
]);

export const transactionSchema = z.object({
  id: z.number().optional(),
  userId: z.string(),
  date: z.date(),
  action: TransactionActionEnum.default(TransactionAction.DEPOSIT),
  type: TransactionTypeEnum.default(TransactionType.MONTHLY_SAVING),
  amount: z.number(),
  remarks: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: userSchema.optional()
});

export const ListTransactionSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10)
});

export const TransactionPagination = z.object({
  transactions: transactionSchema.array().nullish(),
  total: z.number()
});

export type TTransactionSchema = z.infer<typeof transactionSchema>;

export type TListTransactionSchema = z.infer<typeof ListTransactionSchema>;

export type TTransactionPagination = z.infer<typeof TransactionPagination>;
