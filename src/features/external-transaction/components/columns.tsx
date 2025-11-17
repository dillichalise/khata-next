'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { TSagarTransactionSchema } from '@/schema/sagar-transaction.schema';
import { Badge } from '@/components/ui/badge';

const getActionColor = (type: string) => {
  switch (type) {
    case 'DEPOSIT':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
    case 'WITHDRAW':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

export const columns: ColumnDef<TSagarTransactionSchema>[] = [
  {
    accessorKey: 'id',
    header: 'SN',
    cell: ({ row }) => {
      const rowIndex = row.index;
      const serialNumber = rowIndex + 1;
      return <div className='font-medium'>{serialNumber}</div>;
    }
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) =>
      row.original.date ? format(row.original.date, 'PP') : null
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'));
      const type = row.original.type;
      const isDebit = type === 'WITHDRAW';
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
        <Badge className={getActionColor(type)} variant='outline'>
          {type}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'remarks',
    header: 'Description'
  }
];
