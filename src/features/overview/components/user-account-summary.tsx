'use client';

import { useQuery } from '@tanstack/react-query';
import { USER_ACCOUNT_SUMMARY } from '@/constants/keys';
import { getUserAccountSummaryAction } from '@/actions';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format-currency';
import { UserAccountSummarySkeleton } from '@/features/overview/components/user-account-summary-skeleton';

export default function UserAccountSummary({ userId }: { userId?: number }) {
  const { data, isLoading } = useQuery({
    queryKey: [USER_ACCOUNT_SUMMARY],
    queryFn: () => getUserAccountSummaryAction({ userId: userId as number })
  });

  if (isLoading) return <UserAccountSummarySkeleton />;

  return (
    <div className='mb-4 flex w-full flex-col gap-2 text-lg font-semibold'>
      <div>{data?.data?.name}</div>
      <Card className='m-0 w-full bg-yellow-700 px-4 py-2 text-white'>
        You have remaining loan amount of{' '}
        {formatCurrency(+data?.data?.remainingLoan)}
      </Card>
      <Card className='m-0 w-full bg-red-700 px-4 py-2 text-white'>
        You have {formatCurrency(+data?.data?.totalInterest)} remaining interest
        as of today.
      </Card>
    </div>
  );
}
