'use client';

import { useQuery } from '@tanstack/react-query';
import { TRANSACTIONS } from '@/constants/keys';
import { getUserTransactionsAction } from '@/actions';
import { useParams } from 'next/navigation';
import { useTransactionFilters } from '@/features/transaction/lib/use-transaction-search-params';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/ui/table/data-table';
import { TTransactionSchema } from '@/schema/transaction.schema';
import { TransactionType } from '@prisma/client';
import { getTransactionColumns } from '@/features/user/components/transaction-columns';

export default function UserMonthlySaving() {
  const { id } = useParams();
  const { page, limit } = useTransactionFilters();

  const filters = {
    page,
    limit,
    userId: Number(id),
    type: TransactionType.MONTHLY_SAVING
  };

  const { data, isLoading } = useQuery({
    queryKey: [TRANSACTIONS, filters],
    queryFn: () => getUserTransactionsAction(filters)
  });

  const transactions = data?.data?.transactions as TTransactionSchema[];

  if (isLoading) return <Skeleton />;

  return (
    <div>
      <DataTable
        columns={getTransactionColumns(TransactionType.MONTHLY_SAVING)}
        data={transactions}
        totalItems={data?.data?.total || 0}
      />
    </div>
  );
}
