'use client';

import { useForm } from 'react-hook-form';
import {
  createTransactionSchema,
  TCreateTransactionSchema
} from '@/schema/transaction.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TransactionAction,
  TransactionType,
  UserStatus
} from '@/types/prisma-enums';
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
import { TRANSACTIONS, USER_ACCOUNT_SUMMARY, USERS } from '@/constants/keys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTransactionTypeOptions } from '@/features/options';
import {
  getAllUsersAction,
  createTransactionAction,
  getUserAccountSummaryAction
} from '@/actions';
import { CalendarIcon } from 'lucide-react';
import { cn, roundDecimal } from '@/lib/utils';
import { useEffect } from 'react';

type CreateTransactionFormProps = {
  onSuccess?: () => void;
};

export default function CreateTransactionForm({
  onSuccess
}: CreateTransactionFormProps) {
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery({
    queryKey: [USERS],
    queryFn: () => getAllUsersAction({ status: UserStatus.ACTIVE })
  });

  const form = useForm<TCreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      userId: undefined,
      action: TransactionAction.DEPOSIT,
      type: undefined,
      amount: 0,
      interestAmount: 0,
      loanReturnAmount: 0,
      date: new Date()
    }
  });

  const { executeAsync, isExecuting, isPending } = useAction(
    createTransactionAction
  );

  const selectedAction = form.watch('action');
  const selectedType = form.watch('type');
  const userId = form.watch('userId');
  const depositedTotal = Number(form.watch('amount'));
  const selectedDate = form.watch('date');

  const { refetch } = useQuery({
    queryKey: [USER_ACCOUNT_SUMMARY],
    queryFn: () =>
      getUserAccountSummaryAction({ userId: +userId, date: selectedDate })
  });

  const TransactionTypeOptions = getTransactionTypeOptions(selectedAction);

  const userOptions = userData?.data?.map((item) => ({
    value: item.id,
    label: `${item.firstName} ${item.lastName}`
  }));

  const fetchAndSetAmount = async () => {
    try {
      const result = await refetch();

      if (result.data) {
        const interestToPay = roundDecimal(
          result?.data?.data?.totalInterest || 0.0
        );

        form.setValue('interestAmount', interestToPay, {
          shouldValidate: true
        });
        if (depositedTotal >= interestToPay) {
          form.setValue(
            'loanReturnAmount',
            roundDecimal(depositedTotal - interestToPay)
          );
          form.clearErrors('amount');
        } else {
          form.setError('amount', {
            message:
              'Deposit amount must be greater than or equal to interest to be paid.'
          });
        }
      }
    } catch (error) {
      console.error('Error fetching amount:', error);
    }
  };

  useEffect(() => {
    if (selectedType !== TransactionType.INTEREST || !userId) return;
    fetchAndSetAmount();
  }, [userId, selectedType, depositedTotal, selectedDate]);

  useEffect(() => {
    if (selectedType === TransactionType.MONTHLY_SAVING) {
      form.setValue('amount', 20000);
      form.resetField('interestAmount');
      form.resetField('loanReturnAmount');
      form.clearErrors('amount');
    } else form.resetField('amount');
  }, [selectedType]);

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
                  <FormLabel>User</FormLabel>
                  <Select disabled={isLoading} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select User' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userOptions?.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value.toString()}
                        >
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
                        onClick={() => {
                          field.onChange(TransactionAction.DEPOSIT);
                          form.resetField('type');
                          // form.resetField('type', {
                          //   keepTouched: false,
                          //   keepDirty: false
                          // });
                        }}
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
                        onClick={() => {
                          field.onChange(TransactionAction.WITHDRAW);
                          form.resetField('type');
                          // form.resetField('type', {
                          //   keepTouched: false,
                          //   keepDirty: false
                          // });
                        }}
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
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className='w-full'
                        value={field.value ?? undefined}
                      >
                        <SelectValue placeholder='Select transaction type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TransactionTypeOptions.map((type) => (
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
                            'w-full cursor-pointer justify-start text-left',
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
                    {selectedType === TransactionType.INTEREST
                      ? 'Total Amount'
                      : 'Amount'}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Enter transaction amount' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedType === TransactionType.INTEREST && (
              <div className='flex justify-between'>
                <FormField
                  control={form.control}
                  name='interestAmount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest Amount</FormLabel>
                      <FormControl>
                        <Input
                          disabled={true}
                          placeholder='Enter Interest amount'
                          {...field}
                          value={field?.value ?? 0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='loanReturnAmount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Return Amount</FormLabel>
                      <FormControl>
                        <Input
                          disabled={true}
                          placeholder='Enter Loan return amount'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <Button
              disabled={isPending || isExecuting || form.formState.isSubmitting}
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
