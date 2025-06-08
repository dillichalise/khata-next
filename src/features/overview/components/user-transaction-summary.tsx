'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserTransactionSummaryAction } from '@/actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { USER_SUMMARY } from '@/constants/keys';
import { formatCurrency } from '@/lib/format-currency';
import Link from 'next/link';
import { UserTransactionsSummarySkeleton } from './user-transactions-skeleton';
import {
  AlertCircle,
  ExternalLink,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function UserTransactionSummary() {
  const { data, isLoading } = useQuery({
    queryKey: [USER_SUMMARY],
    queryFn: () => getUserTransactionSummaryAction()
  });

  if (isLoading) {
    return <UserTransactionsSummarySkeleton />;
  }

  const users = data?.data || [];

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            User Transaction Summary
          </h2>
          <p className='text-muted-foreground'>
            Overview of all user accounts and their financial status
          </p>
        </div>
        <div className='text-muted-foreground text-sm'>
          Total Users: <span className='font-medium'>{users.length}</span>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className='block space-y-4 md:hidden'>
        {users.map((user, index) => {
          const hasOutstandingLoan = user.remainingLoan > 0;
          const hasHighFines = user.totalFinePaid > 150;

          return (
            <Card key={user.userId} className='w-full'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium'>
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className='text-base'>
                        <Link
                          href={`/user/${user.userId}`}
                          className='text-primary flex items-center gap-1 hover:underline'
                        >
                          {user.fullName}
                          <ExternalLink className='h-3 w-3' />
                        </Link>
                      </CardTitle>
                    </div>
                  </div>
                  <Badge variant='secondary'>ACTIVE</Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='grid grid-cols-2 gap-3 text-sm'>
                  <div>
                    <p className='text-muted-foreground'>Total Savings</p>
                    <div className='flex items-center gap-1'>
                      <TrendingUp className='h-3 w-3 text-green-500' />
                      <span className='font-medium text-green-600'>
                        {formatCurrency(+user.totalSavings)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Remaining Loan</p>
                    <div className='flex items-center gap-1'>
                      {hasOutstandingLoan && (
                        <TrendingDown className='h-3 w-3 text-red-500' />
                      )}
                      <span
                        className={`font-medium ${hasOutstandingLoan ? 'text-red-600' : 'text-gray-500'}`}
                      >
                        {formatCurrency(+user.remainingLoan)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Interest Paid</p>
                    <span className='font-medium'>
                      {formatCurrency(+user.totalInterestPaid)}
                    </span>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Fine Paid</p>
                    <div className='flex items-center gap-1'>
                      {hasHighFines && (
                        <AlertCircle className='h-3 w-3 text-orange-500' />
                      )}
                      <span
                        className={`font-medium ${hasHighFines ? 'text-orange-600' : ''}`}
                      >
                        {formatCurrency(+user.totalFinePaid)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button asChild variant='outline' size='sm' className='w-full'>
                  <Link href={`/user/${user.userId}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className='hidden md:block'>
        <div className='overflow-hidden rounded-md border'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader className='bg-muted/50 sticky top-0 z-10'>
                <TableRow>
                  <TableHead className='w-12'>SN</TableHead>
                  <TableHead className='min-w-[150px]'>Name</TableHead>
                  <TableHead className='text-right'>Total Saving</TableHead>
                  <TableHead className='text-right'>Interest Paid</TableHead>
                  <TableHead className='text-right'>Fine Paid</TableHead>
                  <TableHead className='text-right'>Remaining Loan</TableHead>
                  <TableHead className='text-center'>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users?.map((user, index) => {
                  const hasOutstandingLoan = user.remainingLoan > 0;
                  const hasHighFines = user.totalFinePaid > 150;

                  return (
                    <TableRow key={index} className='hover:bg-muted/50'>
                      <TableCell className='font-medium'>{index + 1}</TableCell>
                      <TableCell>
                        <div className='space-y-1'>
                          <Link
                            href={`/dashboard/user/${user.userId}`}
                            className='flex items-center gap-1 font-medium hover:underline'
                          >
                            {user.fullName}
                            <ExternalLink className='h-3 w-3' />
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex items-center justify-end gap-1'>
                          <TrendingUp className='h-3 w-3 text-green-500' />
                          <span className='font-medium text-green-600'>
                            {formatCurrency(+user.totalSavings)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <span className='font-medium'>
                          {formatCurrency(+user.totalInterestPaid)}
                        </span>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex items-center justify-end gap-1'>
                          {hasHighFines && (
                            <AlertCircle className='h-3 w-3 text-orange-500' />
                          )}
                          <span
                            className={`font-medium ${hasHighFines ? 'text-orange-600' : ''}`}
                          >
                            {formatCurrency(+user.totalFinePaid)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex items-center justify-end gap-1'>
                          {hasOutstandingLoan && (
                            <TrendingDown className='h-3 w-3 text-red-500' />
                          )}
                          <span
                            className={`font-medium ${hasOutstandingLoan ? 'text-red-600' : 'text-gray-500'}`}
                          >
                            {formatCurrency(+user.remainingLoan)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <Button asChild variant='outline' size='sm'>
                          <Link href={`/dashboard/user/${user.userId}`}>
                            View Details
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className='grid grid-cols-2 gap-4 border pt-4 md:grid-cols-4'>
        <div className='text-center'>
          <p className='text-muted-foreground text-sm'>Total Savings</p>
          <p className='text-lg font-semibold text-green-600'>
            {formatCurrency(
              users.reduce((sum, user) => sum + Number(user.totalSavings), 0)
            )}
          </p>
        </div>
        <div className='text-center'>
          <p className='text-muted-foreground text-sm'>Total Loans</p>
          <p className='text-lg font-semibold text-red-600'>
            {formatCurrency(
              users.reduce((sum, user) => sum + Number(user.remainingLoan), 0)
            )}
          </p>
        </div>
        <div className='text-center'>
          <p className='text-muted-foreground text-sm'>Total Interest</p>
          <p className='text-lg font-semibold'>
            {formatCurrency(
              users.reduce(
                (sum, user) => sum + Number(user.totalInterestPaid),
                0
              )
            )}
          </p>
        </div>
        <div className='text-center'>
          <p className='text-muted-foreground text-sm'>Total Fines</p>
          <p className='text-lg font-semibold text-orange-600'>
            {formatCurrency(
              users.reduce((sum, user) => sum + Number(user.totalFinePaid), 0)
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
