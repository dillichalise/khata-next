import UserList from '@/features/user/user-list';
import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import UserHeader from '@/features/user/components/user-header';

export default function Page() {
  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-4'>
        <UserHeader />
        <Separator />
        <UserList />
      </div>
    </PageContainer>
  );
}
