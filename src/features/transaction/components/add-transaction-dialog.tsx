'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import CreateTransactionForm from './create-transaction-form';
import { IconPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

export function AddTransactionDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        <Button type='button'>
          <IconPlus /> New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='flex items-center-safe text-xl font-bold'>
          Add Transaction Form
        </DialogHeader>
        <CreateTransactionForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
