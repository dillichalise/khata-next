'use server';

import { authActionClient } from '@/lib/safe-action';
import { createUserSchema, getUserListSchema } from '@/schema';
import { core } from '@/db/core';

export const createUserAction = authActionClient
  .schema(createUserSchema)
  .action(async ({ parsedInput }) => {
    return core.user.createUser(parsedInput);
  });

export const getAllUsersAction = authActionClient
  .schema(getUserListSchema)
  .action(async ({ parsedInput }) => {
    return core.user.getAllUsers(parsedInput);
  });
