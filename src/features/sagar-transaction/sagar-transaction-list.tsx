'use client';

import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { SAGAR_TRANSACTIONS } from '@/constants/keys';
import { columns } from '@/features/sagar-transaction/components/columns';
import { getAllSagarTransactionsAction } from '@/actions';
import { TSagarTransactionSchema } from '@/schema/sagar-transaction.schema';

export default function SagarTransactionList() {
  const { data, isLoading } = useQuery({
    queryKey: [SAGAR_TRANSACTIONS],
    queryFn: () => getAllSagarTransactionsAction()
  });

  const transactions = data?.data?.transactions as TSagarTransactionSchema[];

  if (isLoading) {
    return <DataTableSkeleton columnCount={5} rowCount={10} />;
  }

  return (
    <DataTable
      columns={columns}
      data={transactions || []}
      totalItems={data?.data?.total || 0}
      showPagination={false}
    />
  );
}
