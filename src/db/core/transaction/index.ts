import { db } from '@/db/lib';
import {
  TListUserTransactionsSchema,
  TListTransactionSchema,
  TCreateTransactionSchema
} from '@/schema/transaction.schema';

export function getAllTransactions(data: TListTransactionSchema) {
  return db.transactions.getAllTransactions(data);
}

export function getTransactionsByUserId(data: TListUserTransactionsSchema) {
  return db.transactions.getUserTransactions(data);
}

export async function createTransaction(data: TCreateTransactionSchema) {
  return db.transactions.createCombinedTransactions(data);
}

export function getLoanHistoryByUserId(data: TListUserTransactionsSchema) {
  return db.transactions.getUserLoanTransactions(data);
}
