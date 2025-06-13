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
import { useUser } from '@/context/user-context';
import { UserType } from '@prisma/client';

export function AddTransactionDialog() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const isAdmin = user?.role === UserType.ADMIN;

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        {isAdmin && (
          <Button type='button'>
            <IconPlus /> New Transaction
          </Button>
        )}
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
