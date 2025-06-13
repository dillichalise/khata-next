'use server';

import { authActionClient } from '@/lib/safe-action';
import { z } from 'zod';
import { core } from '@/db/core';
import SuperJSON from 'superjson';
import { TOverallTransactionSummarySchema, TUserSummarySchema } from '@/schema';

export const getUserTransactionSummaryAction = authActionClient
  .schema(z.void())
  .action(async () => {
    const response = await core.summary.getUserTransactionSummary();
    return SuperJSON.parse(
      SuperJSON.stringify(response)
    ) as unknown as TUserSummarySchema[];
  });

export const getOverallTransactionSummaryAction = authActionClient
  .schema(z.void())
  .action(async () => {
    const response = await core.summary.getTransactionSummary();
    return SuperJSON.parse(
      SuperJSON.stringify(response)
    ) as unknown as TOverallTransactionSummarySchema;
  });

export const getUserAccountSummaryAction = authActionClient
  .schema(z.object({ userId: z.number(), date: z.coerce.date().optional() }))
  .action(async ({ parsedInput }) => {
    const response = await core.summary.getUserSummary(
      parsedInput.userId,
      parsedInput.date
    );
    return SuperJSON.parse(SuperJSON.stringify(response)) as unknown as any;
  });
