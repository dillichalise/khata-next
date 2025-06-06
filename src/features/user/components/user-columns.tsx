'use client';

import { User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { maskEmail, maskPhoneNumber } from '@/lib/utils';

export const userColumns: ColumnDef<User>[] = [
  {
    header: 'SN',
    cell: ({ row }) => row.index + 1
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <Link
        href={`user/${row.original.id}`}
      >{`${row.original.firstName} ${row.original.lastName}`}</Link>
    )
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => maskEmail(row?.original.email)
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => maskPhoneNumber(row?.original.phoneNumber)
  },
  {
    accessorKey: 'status',
    header: 'Status'
  }
];
