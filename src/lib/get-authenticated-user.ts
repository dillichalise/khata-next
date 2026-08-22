import { cache } from 'react';
import { core } from '@/db/core';

/**
 * Cached per-request: layouts, parallel route slots, and server actions
 * (e.g. checkUserRole) that call this within the same request all share
 * one DB round trip instead of issuing the same query repeatedly.
 */
export const getAuthenticatedUserData = cache(async (clerkUserId: string) => {
  return await core.user.getUserByClerkId(clerkUserId);
});
