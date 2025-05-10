import { db } from '@/db/lib';
import { TListTransactionSchema } from '@/schema/transaction.schema';

export function getAllTransactions(data: TListTransactionSchema) {
  return db.transactions.getAllTransactions(data);
}
