'use client';

import { User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

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
    header: 'Email'
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  }
];
