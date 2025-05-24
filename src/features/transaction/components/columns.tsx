'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { TTransactionSchema } from '@/schema/transaction.schema';

export const columns: ColumnDef<TTransactionSchema>[] = [
  {
    header: 'SN',
    cell: ({ row }) => row.index + 1
  },
  {
    accessorKey: 'user',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div>{`${row.original?.user?.firstName} ${row.original?.user?.lastName}`}</div>
      );
    }
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => row.original.date && format(row.original.date, 'PP')
  },
  {
    accessorKey: 'action',
    header: 'Action'
  },
  {
    accessorKey: 'type',
    header: 'Type'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks'
  }
];
