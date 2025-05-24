'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { TLoanHistorySchema } from '@/schema/transaction.schema';

export const loanHistoryColumns: ColumnDef<TLoanHistorySchema>[] = [
  {
    header: 'SN',
    cell: ({ row }) => row.index + 1
  },
  {
    accessorKey: 'transactionDate',
    header: 'Transaction Date',
    cell: ({ row }) =>
      row.original.transactionDate && format(row.original.transactionDate, 'PP')
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks'
  },
  {
    accessorKey: 'amount',
    header: 'amount'
  },
  {
    accessorKey: 'remainingLoan',
    header: 'Remaining Loan'
  },
  {
    accessorKey: 'totalDays',
    header: 'Total Days'
  }
];
