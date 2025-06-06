'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { TTransactionSchema } from '@/schema/transaction.schema';
import { Badge } from '@/components/ui/badge';

const getTypeColor = (type: string) => {
  switch (type) {
    case 'LOAN':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'INTEREST':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'LOAN_RETURN':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'FINE':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'MONTHLY_SAVING':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'DEPOSIT':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
    case 'WITHDRAWAL':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

export const columns: ColumnDef<TTransactionSchema>[] = [
  {
    accessorKey: 'id',
    header: 'SN',
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      const rowIndex = row.index;
      const serialNumber = pageIndex * pageSize + rowIndex + 1;
      return <div className='font-medium'>{serialNumber}</div>;
    }
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
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'));
      const type = row.original.type;
      const isDebit = ['LOAN', 'WITHDRAWAL', 'FINE'].includes(type);
      const formatted = new Intl.NumberFormat('en-JP', {
        style: 'currency',
        currency: 'JPY'
      }).format(amount);

      return (
        <div
          className={`font-medium ${isDebit ? 'text-red-600' : 'text-green-600'}`}
        >
          {isDebit ? '-' : '+'}
          {formatted}
        </div>
      );
    }
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return (
        <Badge className={getTypeColor(type)} variant='outline'>
          {type.replace('_', ' ')}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => row.original.date && format(row.original.date, 'PP')
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks'
  }
];
