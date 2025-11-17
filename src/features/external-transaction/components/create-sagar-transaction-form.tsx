'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { useAction } from 'next-safe-action/hooks';
import { useQueryClient } from '@tanstack/react-query';
import {
  createSagarTransactionSchema,
  TCreateSagarTransactionSchema
} from '@/schema/sagar-transaction.schema';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransactionAction } from '@/types/prisma-enums';
import { SAGAR_TRANSACTIONS } from '@/constants/keys';
import { createSagarTransactionAction } from '@/actions';

type CreateSagarTransactionFormProps = {
  onSuccess?: () => void;
};

export default function CreateSagarTransactionForm({
  onSuccess
}: CreateSagarTransactionFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<TCreateSagarTransactionSchema>({
    resolver: zodResolver(createSagarTransactionSchema),
    defaultValues: {
      date: new Date(),
      type: TransactionAction.DEPOSIT,
      amount: 0,
      remarks: ''
    }
  });

  const { executeAsync, isExecuting, isPending } = useAction(
    createSagarTransactionAction
  );

  const selectedType = form.watch('type');

  async function onSubmit(values: TCreateSagarTransactionSchema) {
    executeAsync(values)
      .then(() => {
        onSuccess?.();
        queryClient.invalidateQueries({
          queryKey: [SAGAR_TRANSACTIONS]
        });
      })
      .catch((err) => {
        console.error('Error while creating external transaction', err);
      });
  }

  return (
    <Card className='mx-auto w-full'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <div className='grid grid-cols-2 gap-2 p-1'>
                      <Button
                        type='button'
                        variant='secondary'
                        className={`rounded-full px-3 py-2.5 font-medium transition-colors ${
                          field.value === TransactionAction.DEPOSIT
                            ? 'bg-green-700/80 text-white'
                            : 'border'
                        }`}
                        onClick={() => {
                          field.onChange(TransactionAction.DEPOSIT);
                        }}
                      >
                        {TransactionAction.DEPOSIT}
                      </Button>
                      <Button
                        type='button'
                        className={`rounded-full px-3 py-2.5 font-medium transition-colors ${
                          field.value === TransactionAction.WITHDRAW
                            ? 'bg-red-700/80 text-white'
                            : 'border'
                        }`}
                        onClick={() => {
                          field.onChange(TransactionAction.WITHDRAW);
                        }}
                      >
                        {TransactionAction.WITHDRAW}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover modal={false}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type='button'
                          variant='outline'
                          className={cn(
                            'w-full justify-start text-left',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {field.value
                            ? format(field.value, 'PPP')
                            : 'Select date'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent
                      className='z-[999] w-auto p-0'
                      align='start'
                    >
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        defaultMonth={field.value}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {selectedType === TransactionAction.DEPOSIT
                      ? 'Deposit Amount'
                      : 'Withdraw Amount'}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Enter amount' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='remarks'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter remarks' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending || isExecuting || form.formState.isSubmitting}
              type='submit'
              className='h-12 w-full bg-blue-700/80 hover:bg-blue-600/80'
            >
              Add Transaction
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
