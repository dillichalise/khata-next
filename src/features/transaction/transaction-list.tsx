'use client';

import { getAllTransactions } from '@/actions/transaction-action';
import { useQuery } from '@tanstack/react-query';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { TRANSACTIONS } from '@/constants/keys';
import { DataTable } from '@/components/ui/table/data-table';
import { columns } from '@/features/transaction/components/columns';
import { TTransactionSchema } from '@/schema/transaction.schema';
import { useTransactionFilters } from '@/features/transaction/lib/use-transaction-search-params';

export default function TransactionList() {
  const { page, limit } = useTransactionFilters();
  const filters = { page, limit };

  const { data, isLoading } = useQuery({
    queryKey: [TRANSACTIONS, filters],
    queryFn: () => getAllTransactions(filters)
  });

  const transactions = data?.data?.transactions as TTransactionSchema[];

  if (isLoading) return <DataTableSkeleton columnCount={5} rowCount={10} />;

  return (
    <div>
      Transaction list
      <DataTable
        columns={columns}
        data={transactions}
        totalItems={data?.data?.total || 0}
      />
    </div>
  );
}
