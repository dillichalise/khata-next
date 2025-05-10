import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import TransactionList from '@/features/transaction/transaction-list';

export default async function TransactionPage() {
  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Transaction' description='Manage transactions' />
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm'>
                <IconPlus /> New Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add New Transaction</DialogTitle>
              {/*TODO: Transaction Form*/}
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button type='submit' size='sm' form='transaction-form'>
                    Add Transaction
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        <TransactionList />
      </div>
    </PageContainer>
  );
}
