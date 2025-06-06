'use client';

import { useQuery } from '@tanstack/react-query';
import { USER_ACCOUNT_SUMMARY } from '@/constants/keys';
import { getUserAccountSummaryAction } from '@/actions';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format-currency';
import { UserAccountSummarySkeleton } from '@/features/overview/components/user-account-summary-skeleton';
import { AlertTriangle, Calendar, CheckCircle, CreditCard } from 'lucide-react';

export default function UserAccountSummary({ userId }: { userId?: number }) {
  const { data, isLoading } = useQuery({
    queryKey: [USER_ACCOUNT_SUMMARY],
    queryFn: () => getUserAccountSummaryAction({ userId: userId as number })
  });

  if (isLoading) return <UserAccountSummarySkeleton />;

  const userInfo = data?.data;
  if (!userInfo) return null;
  const hasOutstandingLoan = userInfo.remainingLoan > 0;
  const hasOutstandingInterest = userInfo.totalInterest > 0;

  return (
    <div className='mr-6 mb-4 flex flex-col gap-2 text-lg font-semibold'>
      {/* Account Status Cards */}
      <div className='grid gap-3'>
        {hasOutstandingLoan && (
          <Card className='border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'>
            <CardContent className='flex items-center gap-3 p-4'>
              <CreditCard className='h-5 w-5 text-yellow-600' />
              <div className='flex-1'>
                <p className='text-sm font-medium text-yellow-800 dark:text-yellow-200'>
                  Outstanding Loan
                </p>
                <p className='text-lg font-semibold text-yellow-900 dark:text-yellow-100'>
                  {formatCurrency(userInfo.remainingLoan)}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {hasOutstandingInterest && (
          <Card className='border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20'>
            <CardContent className='flex items-center gap-3 p-4'>
              <AlertTriangle className='h-5 w-5 text-red-600' />
              <div className='flex-1'>
                <p className='text-sm font-medium text-red-800 dark:text-red-200'>
                  Remaining Interest
                </p>
                <p className='text-lg font-semibold text-red-900 dark:text-red-100'>
                  {formatCurrency(userInfo.totalInterest)}
                </p>
                <p className='text-xs text-red-700 dark:text-red-300'>
                  Due as of today
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {!hasOutstandingLoan && !hasOutstandingInterest && (
          <Card className='border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950/20'>
            <CardContent className='flex items-center gap-3 p-4'>
              <CheckCircle className='h-5 w-5 text-green-600' />
              <div className='flex-1'>
                <p className='text-sm font-medium text-green-800 dark:text-green-200'>
                  Account Status
                </p>
                <p className='text-lg font-semibold text-green-900 dark:text-green-100'>
                  All Clear!
                </p>
                <p className='text-xs text-green-700 dark:text-green-300'>
                  No outstanding balances
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Information */}
        {(userInfo.lastPaymentDate || userInfo.nextPaymentDue) && (
          <Card className='bg-muted/50'>
            <CardContent className='p-4'>
              <div className='mb-2 flex items-center gap-2'>
                <Calendar className='text-muted-foreground h-4 w-4' />
                <span className='text-sm font-medium'>Payment Schedule</span>
              </div>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                {userInfo.lastPaymentDate && (
                  <div>
                    <p className='text-muted-foreground'>Last Payment</p>
                    <p className='font-medium'>
                      {new Date(userInfo.lastPaymentDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {userInfo.nextPaymentDue && (
                  <div>
                    <p className='text-muted-foreground'>Next Due</p>
                    <p className='font-medium'>
                      {new Date(userInfo.nextPaymentDue).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
