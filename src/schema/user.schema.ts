import { z } from 'zod';

// Define enums for role and status
const UserType = z.enum(['USER', 'ADMIN']);
const UserStatus = z.enum(['ACTIVE', 'INACTIVE']);

// Zod schema for the User model
const userSchema = z.object({
  id: z.number().optional(),
  clerkUserId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  role: UserType.optional().default('USER'),
  status: UserStatus.optional().default('ACTIVE'),
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

export type TUserSchema = z.infer<typeof userSchema>;

export type TCreateUserSchema = z.infer<typeof createUserSchema>;
