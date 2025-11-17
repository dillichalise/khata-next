'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import { useUser } from '@/context/user-context';
import CreateSagarTransactionForm from '@/features/sagar-transaction/components/create-sagar-transaction-form';

export function AddSagarTransactionDialog() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const canAccess =
    user?.role === 'ADMIN' && user?.email === 'dillichalise@gmail.com';

  if (!canAccess) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button
          type='button'
          className='flex cursor-pointer items-center gap-2'
        >
          <IconPlus className='h-4 w-4' />
          New External Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Add External Transaction</DialogTitle>
        </DialogHeader>
        <CreateSagarTransactionForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
