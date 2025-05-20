import { UserStatus, UserType } from '@prisma/client';
import { z } from 'zod';

// Define enums for role and status
const UserTypeEnum = z.enum([UserType.USER, UserType.ADMIN]);
const UserStatusEnum = z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE]);

// Zod schema for the User model
export const userSchema = z.object({
  id: z.number().optional(),
  clerkUserId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  role: UserTypeEnum.optional().default(UserType.USER),
  status: UserStatusEnum.optional().default(UserStatus.INACTIVE),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  transactions: z.array(z.any()).optional()
});

export const createUserSchema = userSchema.pick({
  clerkUserId: true,
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  role: true
});

export const getUserListSchema = userSchema
  .pick({
    status: true,
    role: true
  })
  .partial();

export const userSummarySchema = z.object({
  userId: z.number(),
  fullName: z.string(),
  totalSavings: z.number(),
  totalInterestPaid: z.number(),
  totalFinePaid: z.number()
});

export type TUserSchema = z.infer<typeof userSchema>;

export type TCreateUserSchema = z.infer<typeof createUserSchema>;

export type TGetUserListSchema = z.infer<typeof getUserListSchema>;

export type TUserSummarySchema = z.infer<typeof userSummarySchema>;
