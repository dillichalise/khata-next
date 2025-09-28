// Browser-safe mirrors of Prisma enums for use in client components
// Avoid importing from '@prisma/client' in the browser to prevent bundling Prisma.

export const UserType = {
  USER: 'USER',
  ADMIN: 'ADMIN'
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const TransactionType = {
  LOAN: 'LOAN',
  INTEREST: 'INTEREST',
  LOAN_RETURN: 'LOAN_RETURN',
  FINE: 'FINE',
  MONTHLY_SAVING: 'MONTHLY_SAVING'
} as const;
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export const TransactionAction = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW'
} as const;
export type TransactionAction =
  (typeof TransactionAction)[keyof typeof TransactionAction];
