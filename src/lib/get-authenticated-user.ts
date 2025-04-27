import { core } from '@/db/core';

export async function getAuthenticatedUserData(clerkUserId: string) {
  return await core.user.getUserByClerkId(clerkUserId);
}
