'use server';

import { actionClient } from '@/lib/safe-action';
import { createUserSchema } from '@/schema';
import { core } from '@/db/core';

export const createUserAction = actionClient
  .schema(createUserSchema)
  .action(async ({ parsedInput }) => {
    return core.user.createUser(parsedInput);
  });
