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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export function UserTransactionSummary() {
  const { data } = useQuery({
    queryKey: [USER_SUMMARY],
    queryFn: () => getUserTransactionSummaryAction()
  });

  return (
    <div className='flex flex-1 flex-col space-y-2'>
      <div className='relative flex min-h-[500px] flex-1'>
        <div className='absolute inset-0 flex overflow-hidden rounded-lg border'>
          <ScrollArea className='h-full w-full'>
            <Table className='relative'>
              <TableHeader className='bg-muted sticky top-0 z-1'>
                <TableRow>
                  <TableHead>SN</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Total Saving</TableHead>
                  <TableHead>Total Interest Paid</TableHead>
                  <TableHead>Total Fine Paid</TableHead>
                  <TableHead>Remaining Loan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link href={`user/${user.userId}`}>{user.fullName}</Link>
                    </TableCell>
                    <TableCell>{formatCurrency(+user.totalSavings)}</TableCell>
                    <TableCell>
                      {formatCurrency(+user.totalInterestPaid)}
                    </TableCell>
                    <TableCell>{formatCurrency(+user.totalFinePaid)}</TableCell>
                    <TableCell>{formatCurrency(+user.remainingLoan)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
