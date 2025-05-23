'use client';

import { useParams } from 'next/navigation';
import { useTransactionFilters } from '@/features/transaction/lib/use-transaction-search-params';
import { TransactionType } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { TRANSACTIONS } from '@/constants/keys';
import { getUserTransactionsAction } from '@/actions';
import { TTransactionSchema } from '@/schema/transaction.schema';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/ui/table/data-table';
import { getTransactionColumns } from '@/features/user/components/transaction-columns';

export default function UserLoan() {
  const { id } = useParams();
  const { page, limit } = useTransactionFilters();
  const filters = {
    page,
    limit,
    userId: Number(id),
    type: TransactionType.LOAN
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
        columns={getTransactionColumns(TransactionType.LOAN)}
        data={transactions}
        totalItems={data?.data?.total || 0}
      />
    </div>
  );
}
