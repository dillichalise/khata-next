'use server';

import { authActionClient, authAdminClient } from '@/lib/safe-action';
import { core } from '@/db/core';
import SuperJSON from 'superjson';
import {
  createSagarTransactionSchema,
  TSagarTransactionPagination
} from '@/schema/sagar-transaction.schema';
import { z } from 'zod';

export const getAllSagarTransactionsAction = authActionClient
  .schema(z.void())
  .action(async ({}) => {
    const sagarTransactions =
      await core.sagarTransactions.getAllSagarTransactions();

    return SuperJSON.parse(
      SuperJSON.stringify(sagarTransactions)
    ) as unknown as TSagarTransactionPagination;
  });

export const createSagarTransactionAction = authAdminClient
  .schema(createSagarTransactionSchema)
  .action(async ({ parsedInput }) => {
    const result =
      await core.sagarTransactions.createSagarTransaction(parsedInput);

    return SuperJSON.parse(SuperJSON.stringify(result));
  });
