import ProfileViewPage from '@/features/profile/components/profile-view-page';
import { auth } from '@clerk/nextjs/server';
import { getAuthenticatedUserData } from '@/lib/get-authenticated-user';
import { isAdmin } from '@/lib/authorization';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dashboard : Profile'
};

export default async function Page() {
  const { userId } = await auth();
  const user = await getAuthenticatedUserData(userId!);

  if (!isAdmin(user.role)) {
    redirect('/unauthorized');
  }

  return <ProfileViewPage />;
}
