import { db } from '@/db/lib';

export function getUserTransactionSummary() {
  return db.summary.getUserTransactionSummary();
}

export function getTransactionSummary() {
  return db.summary.getTransactionSummaryFromUserSummary();
}
