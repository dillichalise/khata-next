'use server';

import { authActionClient, authAdminClient } from '@/lib/safe-action';
import { core } from '@/db/core';
import SuperJSON from 'superjson';
import {
  createTransactionSchema,
  ListUserTransactionsSchema,
  ListTransactionSchema,
  TTransactionPagination,
  TLoanHistoryPagination
} from '@/schema/transaction.schema';

export const getAllTransactions = authActionClient
  .schema(ListTransactionSchema)
  .action(async ({ parsedInput }) => {
    const transactions =
      await core.transactions.getAllTransactions(parsedInput);
    return SuperJSON.parse(
      SuperJSON.stringify(transactions)
    ) as unknown as TTransactionPagination;
  });

export const getUserTransactionsAction = authActionClient
  .schema(ListUserTransactionsSchema)
  .action(async ({ parsedInput }) => {
    const transactions =
      await core.transactions.getTransactionsByUserId(parsedInput);
    return SuperJSON.parse(
      SuperJSON.stringify(transactions)
    ) as unknown as TTransactionPagination;
  });

export const createTransactionAction = authAdminClient
  .schema(createTransactionSchema)
  .action(async ({ parsedInput }) => {
    const result = await core.transactions.createTransaction(parsedInput);
    return SuperJSON.parse(SuperJSON.stringify(result));
  });

export const getUserLoanHistoryAction = authActionClient
  .schema(ListUserTransactionsSchema)
  .action(async ({ parsedInput }) => {
    const loanHistory =
      await core.transactions.getLoanHistoryByUserId(parsedInput);
    return SuperJSON.parse(
      SuperJSON.stringify(loanHistory)
    ) as unknown as TLoanHistoryPagination;
  });
