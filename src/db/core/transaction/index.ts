import { db } from '@/db/lib';
import {
  TCreateTransactionSchema,
  TListTransactionSchema
} from '@/schema/transaction.schema';

export function getAllTransactions(data: TListTransactionSchema) {
  return db.transactions.getAllTransactions(data);
}

export function createTransaction(data: TCreateTransactionSchema) {
  return db.transactions.createTransaction(data);
}
