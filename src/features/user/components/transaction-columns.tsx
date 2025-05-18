import { TTransactionSchema } from '@/schema/transaction.schema';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { TransactionType } from '@prisma/client';
import { getTransactionTypeColor } from '@/lib/helper';
import { cn } from '@/lib/utils';

export const getTransactionColumns = (
  type: TransactionType
): ColumnDef<TTransactionSchema>[] => {
  const isLoan = type === TransactionType.LOAN;

  return [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    ...(isLoan ? [{ accessorKey: 'type', header: 'Type' }] : []),
    {
      accessorKey: 'date',
      header: !isLoan ? 'Saving Month' : 'Date',
      cell: ({ row }) =>
        row.original.date &&
        format(row.original.date, !isLoan ? 'MMMM, yyyy' : 'PP')
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = row.original.amount;
        return (
          <span className={cn(getTransactionTypeColor(row.original.type))}>
            {amount}
          </span>
        );
      }
    },
    ...(isLoan ? [{ accessorKey: 'remarks', header: 'Remarks' }] : [])
  ];
};
