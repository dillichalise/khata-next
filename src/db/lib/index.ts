import * as users from '@/db/lib/user';
import * as transactions from '@/db/lib/transaction';
import * as summary from 'src/db/lib/summary';
import { prisma } from '@/db/lib/prisma';

async function checkDatabase(): Promise<boolean> {
  try {
    // This forces Prisma to connect to the DB
    await prisma.$connect();
    await prisma.$disconnect();
    return true;
  } catch (error: any) {
    console.error('🔌 Database connection failed:', error?.message);
    return false;
  }
}

export const db = {
  users,
  transactions,
  summary,
  checkDatabase
};
