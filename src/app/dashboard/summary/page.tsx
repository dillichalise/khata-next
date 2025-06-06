import { UserTransactionSummary } from '@/features/overview/components/user-transaction-summary';

export default function AccountSummary() {
  return (
    <div className='min-h-screen w-full'>
      <div className='container mx-auto px-4 py-8'>
        <UserTransactionSummary />
      </div>
    </div>
  );
}
