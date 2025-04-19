import { db } from '@/db/lib';

export async function getAuthenticatedUser(userId: string) {
  return await db.users.getUserById(userId);
}
