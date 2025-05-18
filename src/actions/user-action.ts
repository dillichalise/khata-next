'use server';

import { actionClient } from '@/lib/safe-action';
import { createUserSchema, getUserListSchema } from '@/schema';
import { core } from '@/db/core';
import { z } from 'zod';
import SuperJSON from 'superjson';

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

export const getUserDetailAction = actionClient
  .schema(z.object({ userId: z.number() }))
  .action(async ({ parsedInput }) => {
    const response = await core.user.getUserDetail(parsedInput.userId);
    return SuperJSON.parse(SuperJSON.stringify(response));
  });

export const getAllUsersAction = actionClient
  .schema(getUserListSchema)
  .action(async ({ parsedInput }) => {
    return core.user.getAllUsers(parsedInput);
  });
