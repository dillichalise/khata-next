'use client';

import { useParams } from 'next/navigation';
import { useTransactionFilters } from '@/features/transaction/lib/use-transaction-search-params';
import { TransactionType } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { LOAN_HISTORY } from '@/constants/keys';
import { getUserLoanHistoryAction } from '@/actions';
import { TLoanHistorySchema } from '@/schema/transaction.schema';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/ui/table/data-table';
import { loanHistoryColumns } from '@/features/user/components/loan-summary-columns';

export default function UserLoan() {
  const { id } = useParams();
  const { page, limit } = useTransactionFilters();
  const filters = {
    page,
    limit,
    userId: Number(id),
    type: TransactionType.LOAN
  };

  const { data: userLoanHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: [LOAN_HISTORY, filters],
    queryFn: () => getUserLoanHistoryAction(filters)
  });

  const loanHistories = userLoanHistory?.data
    ?.loanHistoryData as TLoanHistorySchema[];

  if (isLoadingHistory) return <Skeleton />;

  return (
    <div>
      <DataTable
        columns={loanHistoryColumns}
        data={loanHistories}
        totalItems={userLoanHistory?.data?.total || 0}
        getRowClassName={(row) => {
          switch (row.description) {
            case 'LOAN':
              return 'bg-blue-200 hover:bg-blue-400 dark:bg-blue-950/20 dark:hover:bg-blue-950/30';
            case 'INTEREST':
              return 'bg-red-200 hover:bg-red-400 dark:bg-red-800/20 dark:hover:bg-red-700/30';
            case 'LOAN_RETURN':
              return 'bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-500/20 dark:hover:bg-cyan-900/30';
            default:
              return 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-950/20 dark:hover:bg-gray-950/30';
          }
        }}
      />
    </div>
  );
}
