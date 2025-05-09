'use client';

import { getAllUsersAction } from '@/actions';
import { useQuery } from '@tanstack/react-query';
import { USERS } from '@/constants/keys';
import { columns } from '@/features/user/components/columns';
import { User } from '@prisma/client';
import { DataTable } from '@/components/ui/table/data-table';

export default function UserList() {
  const { data, isLoading } = useQuery({
    queryKey: [USERS],
    queryFn: () => getAllUsersAction()
  });

  const users: User[] = data?.data as User[];

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <DataTable columns={columns} data={users} totalItems={users.length} />
    </div>
  );
}
