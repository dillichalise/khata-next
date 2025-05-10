import { parseAsInteger } from 'nuqs/server';

export const transactionSearchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10)
};
