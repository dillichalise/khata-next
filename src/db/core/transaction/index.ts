import { db } from '@/db/lib';
import {
  TCreateTransactionSchema,
  TListUserTransactionsSchema,
  TListTransactionSchema
} from '@/schema/transaction.schema';

export function getAllTransactions(data: TListTransactionSchema) {
  return db.transactions.getAllTransactions(data);
}

export function getTransactionsByUserId(data: TListUserTransactionsSchema) {
  return db.transactions.getUserTransactions(data);
}

export function createTransaction(data: TCreateTransactionSchema) {
  return db.transactions.createTransaction(data);
}
