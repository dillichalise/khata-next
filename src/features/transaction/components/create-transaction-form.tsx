'use client';

import { useForm } from 'react-hook-form';
import {
  createTransactionSchema,
  TCreateTransactionSchema
} from '@/schema/transaction.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionAction, TransactionType } from '@prisma/client';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { useAction } from 'next-safe-action/hooks';
import { createTransactionAction } from '@/actions/transaction-action';
import { TRANSACTIONS } from '@/constants/keys';
import { useQueryClient } from '@tanstack/react-query';

type CreateTransactionFormProps = {
  onSuccess?: () => void;
};

export default function CreateTransactionForm({
  onSuccess
}: CreateTransactionFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<TCreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    values: {
      userId: undefined,
      action: TransactionAction.DEPOSIT,
      type: undefined,
      amount: 0,
      date: undefined
    }
  });

  const { executeAsync, isExecuting, isPending } = useAction(
    createTransactionAction
  );

  async function onSubmit(submitValue: TCreateTransactionSchema) {
    executeAsync(submitValue)
      .then(() => {
        onSuccess?.();
        queryClient.invalidateQueries({
          queryKey: [TRANSACTIONS]
        });
      })
      .catch((err) => {
        console.error('Error while creating transaction', err);
      });
  }

  const transactionTypeOptions = () => {
    const withdrawTypes = [TransactionType.LOAN];
    const depositTypes = [
      TransactionType.MONTHLY_SAVING,
      TransactionType.INTEREST,
      TransactionType.FINE,
      TransactionType.LOAN_RETURN
    ];

    const options =
      form.getValues('action') === TransactionAction.DEPOSIT
        ? depositTypes
        : withdrawTypes;

    return options.map((type) => ({
      label: type,
      value: type
    }));
  };

  form.watch('action');

  return (
    <Card className='mx-auto w-full'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='userId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Id</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='action'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='grid grid-cols-2 gap-2 p-1'>
                      <button
                        type='button'
                        className={`text rounded-full px-3 py-2.5 font-medium transition-colors ${
                          field.value === TransactionAction.DEPOSIT
                            ? 'bg-green-700/80 text-white'
                            : 'hover:bg-muted border'
                        }`}
                        onClick={() =>
                          field.onChange(TransactionAction.DEPOSIT)
                        }
                      >
                        {TransactionAction.DEPOSIT}
                      </button>
                      <button
                        type='button'
                        className={`text rounded-full px-3 py-2.5 font-medium transition-colors ${
                          field.value === TransactionAction.WITHDRAW
                            ? 'bg-red-700/80 text-white'
                            : 'hover:bg-muted border'
                        }`}
                        onClick={() =>
                          field.onChange(TransactionAction.WITHDRAW)
                        }
                      >
                        {TransactionAction.WITHDRAW}
                      </button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select transaction type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transactionTypeOptions().map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter transaction amount' {...field} />
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
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          type='button'
                          variant='outline'
                          className='w-full cursor-pointer'
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending || isExecuting}
              type='submit'
              className='h-12 w-full cursor-pointer bg-blue-700/80 hover:bg-blue-600/80'
            >
              Add Transaction
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
