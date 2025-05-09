import { db } from '@/db/lib';
import { TCreateUserSchema } from '@/schema';

export function getUserByClerkId(clerkUserId: string) {
  return db.users.getUserByClerkUserId(clerkUserId);
}

export function createUser(user: TCreateUserSchema) {
  return db.users.createUser(user);
}

export function getAllUsers() {
  return db.users.getAllUsers();
}
