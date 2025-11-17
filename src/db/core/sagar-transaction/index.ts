import { db } from '@/db/lib';
import { TCreateSagarTransactionSchema } from '@/schema/sagar-transaction.schema';

export function getAllSagarTransactions() {
  return db.sagarTransactions.getAllSagarTransactions();
}

export async function createSagarTransaction(
  data: TCreateSagarTransactionSchema
) {
  return db.sagarTransactions.createSagarTransaction(data);
}
