import { Heading } from '@/components/ui/heading';
import ExternalTransactionList from '@/features/external-transaction/external-transaction-list';
import { AddSagarTransactionDialog } from '@/features/external-transaction/components/add-sagar-transaction-dialog';

export default async function ExternalTransactionPage() {
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
        <ExternalTransactionList />
      </div>
    </div>
  );
}
