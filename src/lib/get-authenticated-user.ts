import { db } from '@/db/lib';

export async function getAuthenticatedUserData(clerkUserId: string) {
  return await db.users.getUserByClerkUserId(clerkUserId);
}
