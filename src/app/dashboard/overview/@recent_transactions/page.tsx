import { delay } from '@/constants/mock-api';
import { RecentTransactions } from '@/features/overview/components/recent-transactions';

export default async function RecentTransactionsPage() {
  await delay(3000);
  return <RecentTransactions />;
}
