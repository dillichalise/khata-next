import { Heading } from '@/components/ui/heading';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import { checkUserRole } from '@/lib/authorization';

export default async function UserHeader() {
  const userRole = await checkUserRole();

  const isAdmin = userRole.role === 'ADMIN';

  return (
    <div className='flex items-start justify-between'>
      <Heading title='Users' description='Manage users.' />
      {isAdmin && (
        <Link
          href='/dashboard/user/add'
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
        >
          <IconPlus className='mr-2 h-4 w-4' /> Add New
        </Link>
      )}
    </div>
  );
}
