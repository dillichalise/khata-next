import { UserTransactionSummary } from '@/features/overview/components/user-transaction-summary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khata Summary',
  description: 'Summary of User Transactions'
};

export default function AccountSummary() {
  return (
    <div className='min-h-screen w-full'>
      <div className='container mx-auto px-4 py-8'>
        <UserTransactionSummary />
      </div>
    </div>
  );
}
