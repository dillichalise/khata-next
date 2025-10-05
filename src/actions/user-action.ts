'use server';

import { authActionClient, authAdminClient } from '@/lib/safe-action';
import {
  createUserSchema,
  getUserListSchema,
  updateUserSchema
} from '@/schema';
import { core } from '@/db/core';

export const createUserAction = authActionClient
  .schema(createUserSchema)
  .action(async ({ parsedInput }) => {
    return core.user.createUser(parsedInput);
  });

export const updateUserAction = authAdminClient
  .schema(updateUserSchema)
  .action(async ({ parsedInput }) => {
    return core.user.updateUser(parsedInput);
  });

export const getAllUsersAction = authActionClient
  .schema(getUserListSchema)
  .action(async ({ parsedInput }) => {
    return core.user.getAllUsers(parsedInput);
  });
