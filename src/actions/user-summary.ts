'use server';

import { actionClient } from '@/lib/safe-action';
import { z } from 'zod';
import { core } from '@/db/core';
import SuperJSON from 'superjson';
import { TUserSummarySchema } from '@/schema';

export const getUserTransactionSummaryAction = actionClient
  .schema(z.void())
  .action(async () => {
    const response = await core.userSummary.getUserTransactionSummary();
    return SuperJSON.parse(
      SuperJSON.stringify(response)
    ) as unknown as TUserSummarySchema[];
  });
