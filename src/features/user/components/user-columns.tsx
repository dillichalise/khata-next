'use client';

import type { TUserSchema } from '@/schema/user.schema';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { maskEmail, maskPhoneNumber } from '@/lib/utils';
import { UserStatusCell } from './user-status-cell';

export const userColumns = (isAdmin: boolean): ColumnDef<TUserSchema>[] => [
  {
    header: 'SN',
    cell: ({ row }) => row.index + 1
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <Link href={`user/${row.original.id}`}>
        {`${row.original.firstName} ${row.original.lastName}`}
      </Link>
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
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <UserStatusCell
          userId={row.original.id as number}
          value={status}
          editable={isAdmin}
        />
      );
    }
  }
];
