'use server';

import { actionClient } from '@/lib/safe-action';
import { createUserSchema } from '@/schema';
import { core } from '@/db/core';
import { z } from 'zod';

export const createUserAction = actionClient
  .schema(createUserSchema)
  .action(async ({ parsedInput }) => {
    return core.user.createUser(parsedInput);
  });

export const getUserAction = actionClient
  .schema(z.object({ clerkUserId: z.string() }))
  .action(async ({ parsedInput }) => {
    return core.user.getUserByClerkId(parsedInput.clerkUserId);
  });

export const getAllUsersAction = actionClient
  .schema(z.void())
  .action(async () => {
    return core.user.getAllUsers();
  });
