'use client';

import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { SAGAR_TRANSACTIONS } from '@/constants/keys';
import { columns } from '@/features/sagar-transaction/components/columns';
import { getAllSagarTransactionsAction } from '@/actions';
import { TSagarTransactionSchema } from '@/schema/sagar-transaction.schema';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/format-currency';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react';

export default function SagarTransactionList() {
  const { data, isLoading } = useQuery({
    queryKey: [SAGAR_TRANSACTIONS],
    queryFn: () => getAllSagarTransactionsAction()
  });

  const transactions = data?.data?.transactions as TSagarTransactionSchema[];

  if (isLoading) {
    return <DataTableSkeleton columnCount={5} rowCount={10} />;
  }

  const difference = data?.data?.difference ?? 0;
  const isPositive = difference > 0;
  const isNegative = difference < 0;
  const color = isPositive
    ? 'text-green-600'
    : isNegative
      ? 'text-red-600'
      : 'text-gray-600';
  const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <div className='space-y-4'>
      <Card className='max-w-sm'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardDescription className='text-muted-foreground text-base font-semibold uppercase'>
              Net External Balance
            </CardDescription>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
          <CardTitle className={`text-2xl font-bold tabular-nums ${color}`}>
            {difference !== 0 && (isPositive ? '+' : '-')}
            {formatCurrency(Math.abs(difference))}
          </CardTitle>
        </CardHeader>
      </Card>

      <DataTable
        columns={columns}
        data={transactions || []}
        totalItems={data?.data?.total || 0}
        showPagination={false}
      />
    </div>
  );
}
