'use client';

import { getAllTransactions } from '@/actions';
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
    <DataTable
      columns={columns}
      data={transactions}
      totalItems={data?.data?.total || 0}
      getRowClassName={(row) => {
        switch (row.type) {
          case 'LOAN':
            return 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-950/30';
          case 'INTEREST':
            return 'bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-950/30';
          case 'LOAN_RETURN':
            return 'bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/20 dark:hover:bg-yellow-950/30';
          case 'FINE':
            return 'bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30';
          case 'MONTHLY_SAVING':
            return 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/20 dark:hover:bg-purple-950/30';
          default:
            return 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-950/20 dark:hover:bg-gray-950/30';
        }
      }}
    />
  );
}
