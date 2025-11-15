import UserList from '@/features/user/user-list';
import UserHeader from '@/features/user/components/user-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khata Users',
  description: 'User List'
};

export default function Page() {
  return (
    <div className='px-4'>
      <div className='flex flex-1 flex-col space-y-4'>
        <UserHeader />
        <UserList />
      </div>
    </div>
  );
}
