import { z } from 'zod';
import { TransactionAction } from '@/types/prisma-enums';

const SagarTransactionActionEnum = z.enum([
  TransactionAction.DEPOSIT,
  TransactionAction.WITHDRAW
]);

export const sagarTransactionSchema = z.object({
  id: z.number(),
  date: z.coerce.date({ message: 'Required' }),
  type: SagarTransactionActionEnum,
  amount: z.coerce.number({ message: 'Required' }),
  remarks: z.string().min(1, { message: 'Required' }),
  createdAt: z.date().optional()
});

export const SagarTransactionPagination = z.object({
  transactions: sagarTransactionSchema.array().nullish(),
  total: z.number(),
  difference: z.number()
});

export const createSagarTransactionSchema = sagarTransactionSchema.pick({
  date: true,
  type: true,
  amount: true,
  remarks: true
});

export type TSagarTransactionSchema = z.infer<typeof sagarTransactionSchema>;

export type TSagarTransactionPagination = z.infer<
  typeof SagarTransactionPagination
>;
export type TCreateSagarTransactionSchema = z.infer<
  typeof createSagarTransactionSchema
>;
