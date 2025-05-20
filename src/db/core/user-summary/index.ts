import { db } from '@/db/lib';

export function getUserTransactionSummary() {
  return db.userSummary.getUserTransactionSummary();
}
