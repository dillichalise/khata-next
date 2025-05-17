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
  id: z.number(),
  userId: z.coerce.number({ message: 'Required' }),
  date: z.coerce.date({ message: 'Required' }),
  action: TransactionActionEnum,
  type: TransactionTypeEnum,
  amount: z.coerce.number({ message: 'Required' }),
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

export const createTransactionSchema = transactionSchema.pick({
  userId: true,
  date: true,
  action: true,
  type: true,
  amount: true,
  remarks: true
});

export type TTransactionSchema = z.infer<typeof transactionSchema>;

export type TListTransactionSchema = z.infer<typeof ListTransactionSchema>;

export type TTransactionPagination = z.infer<typeof TransactionPagination>;

export type TCreateTransactionSchema = z.infer<typeof createTransactionSchema>;
