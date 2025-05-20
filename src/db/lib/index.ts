import * as users from '@/db/lib/user';
import * as transactions from '@/db/lib/transaction';
import * as userSummary from '@/db/lib/user-summary';

export const db = {
  users,
  transactions,
  userSummary
};
