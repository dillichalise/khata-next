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
            return 'bg-[#4F8FC6]/60'; // Soft Blue - calming, financial action
          case 'INTEREST':
            return 'bg-[#7FB77E]/60'; // Muted Green - growth, earnings
          case 'LOAN_RETURN':
            return 'bg-[#FFCB6B]/60'; // Warm Yellow - return, caution
          case 'FINE':
            return 'bg-[#E57373]/60'; // Coral Red - warning but not too harsh
          default:
            return 'bg-[#E0E0E0]/60'; // Light Gray - neutral default
        }
      }}
    />
  );
}
