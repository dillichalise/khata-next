import { db } from '@/db/lib';

export async function getAuthenticatedUserData(userId: string) {
  return await db.users.getUserByClerkUserId(userId);
}
