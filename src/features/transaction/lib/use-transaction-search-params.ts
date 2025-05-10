import { useQueryState } from 'nuqs';
import { transactionSearchParams } from '@/features/transaction/lib/transaction-search-params';

export function useTransactionFilters() {
  const [page, setPage] = useQueryState(
    'page',
    transactionSearchParams.page.withDefault(1)
  );

  const [limit, setLimit] = useQueryState(
    'limit',
    transactionSearchParams.limit.withDefault(10)
  );

  return {
    page,
    limit,
    setLimit,
    setPage
  };
}
