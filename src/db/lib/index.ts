import * as users from '@/db/lib/user';
import * as transactions from '@/db/lib/transaction';
import * as summary from 'src/db/lib/summary';

export const db = {
  users,
  transactions,
  summary
};
