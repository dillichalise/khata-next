import { db } from '@/db/lib';
import {
  TCreateUserSchema,
  TGetUserListSchema,
  TUpdateUserSchema
} from '@/schema';

export function getUserByClerkId(clerkUserId: string) {
  return db.users.getUserByClerkUserId(clerkUserId);
}

export function createUser(user: TCreateUserSchema) {
  return db.users.createUser(user);
}

export function updateUser(updateData: TUpdateUserSchema) {
  return db.users.updateUser(updateData);
}

export function getAllUsers(data: TGetUserListSchema) {
  return db.users.getAllUsers(data);
}

export function getUserCountHealth(): Promise<boolean> {
  return db.users.checkUserCount();
}
