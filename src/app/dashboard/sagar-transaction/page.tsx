import { Heading } from '@/components/ui/heading';
import SagarTransactionList from '@/features/sagar-transaction/sagar-transaction-list';
import { AddSagarTransactionDialog } from '@/features/sagar-transaction/components/add-sagar-transaction-dialog';

export default async function SagarTransactionPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='External Transactions'
            description='Manage External transactions'
          />
          <AddSagarTransactionDialog />
        </div>
        <SagarTransactionList />
      </div>
    </div>
  );
}
