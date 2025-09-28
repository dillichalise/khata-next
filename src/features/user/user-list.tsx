'use client';

import { getAllUsersAction } from '@/actions';
import { useQuery } from '@tanstack/react-query';
import { USERS } from '@/constants/keys';
import { userColumns } from '@/features/user/components/user-columns';
import type { TUserSchema } from '@/schema/user.schema';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

export default function UserList() {
  const { data, isLoading } = useQuery({
    queryKey: [USERS],
    queryFn: () => getAllUsersAction({})
  });

  const users: TUserSchema[] = (data?.data || []) as TUserSchema[];

  if (isLoading) return <DataTableSkeleton columnCount={5} rowCount={10} />;
  return (
    <DataTable columns={userColumns} data={users} totalItems={users.length} />
  );
}
