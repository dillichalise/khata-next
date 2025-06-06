import { Heading } from '@/components/ui/heading';
import TransactionList from '@/features/transaction/transaction-list';
import { AddTransactionDialog } from '@/features/transaction/components/add-transaction-dialog';

export default async function TransactionPage() {
  return (
    <div className='px-4'>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Transaction' description='Manage transactions' />
          <AddTransactionDialog />
        </div>
        <TransactionList />
      </div>
    </div>
  );
}
