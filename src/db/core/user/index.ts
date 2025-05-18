import { db } from '@/db/lib';
import { TCreateUserSchema, TGetUserListSchema } from '@/schema';

export function getUserByClerkId(clerkUserId: string) {
  return db.users.getUserByClerkUserId(clerkUserId);
}

export function getUserDetail(userId: number) {
  return db.users.getUserDetails(userId);
}

export function createUser(user: TCreateUserSchema) {
  return db.users.createUser(user);
}

export function getAllUsers(data: TGetUserListSchema) {
  return db.users.getAllUsers(data);
}
