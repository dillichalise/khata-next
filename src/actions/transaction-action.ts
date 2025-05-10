'use server';

import { actionClient } from '@/lib/safe-action';
import { core } from '@/db/core';
import SuperJSON from 'superjson';
import {
  createTransactionSchema,
  ListTransactionSchema,
  TTransactionPagination
} from '@/schema/transaction.schema';

export const getAllTransactions = actionClient
  .schema(ListTransactionSchema)
  .action(async ({ parsedInput }) => {
    const transactions =
      await core.transactions.getAllTransactions(parsedInput);
    return SuperJSON.parse(
      SuperJSON.stringify(transactions)
    ) as unknown as TTransactionPagination;
  });

export const createTransactionAction = actionClient
  .schema(createTransactionSchema)
  .action(async ({ parsedInput }) => {
    const result = await core.transactions.createTransaction(parsedInput);
    return SuperJSON.parse(SuperJSON.stringify(result));
  });
