'use server';

import { actionClient } from '@/lib/safe-action';
import { z } from 'zod';
import { core } from '@/db/core';
import SuperJSON from 'superjson';
import { TOverallTransactionSummarySchema, TUserSummarySchema } from '@/schema';

export const getUserTransactionSummaryAction = actionClient
  .schema(z.void())
  .action(async () => {
    const response = await core.summary.getUserTransactionSummary();
    return SuperJSON.parse(
      SuperJSON.stringify(response)
    ) as unknown as TUserSummarySchema[];
  });

export const getOverallTransactionSummaryAction = actionClient
  .schema(z.void())
  .action(async () => {
    const response = await core.summary.getTransactionSummary();
    return SuperJSON.parse(
      SuperJSON.stringify(response)
    ) as unknown as TOverallTransactionSummarySchema;
  });

export const getUserAccountSummaryAction = actionClient
  .schema(z.object({ userId: z.number() }))
  .action(async ({ parsedInput }) => {
    const response = await core.summary.getUserSummary(parsedInput.userId);
    return SuperJSON.parse(SuperJSON.stringify(response)) as unknown as any;
  });
