import { Heading } from '@/components/ui/heading';
import TransactionList from '@/features/transaction/transaction-list';
import { AddTransactionDialog } from '@/features/transaction/components/add-transaction-dialog';

export default async function TransactionPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Transactions'
            description='Manage all financial transactions'
          />
          <AddTransactionDialog />
        </div>
        <TransactionList />
      </div>
    </div>
  );
}
