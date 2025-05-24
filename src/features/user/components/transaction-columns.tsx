import { TTransactionSchema } from '@/schema/transaction.schema';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/format-currency';

export const monthlySavingColumns: ColumnDef<TTransactionSchema>[] = [
  {
    header: 'SN',
    cell: ({ row }) => row.index + 1
  },
  {
    accessorKey: 'date',
    header: 'Saving Month',
    cell: ({ row }) => row.original.date && format(row.original.date, 'PP')
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => formatCurrency(+row.original.amount)
  }
];
