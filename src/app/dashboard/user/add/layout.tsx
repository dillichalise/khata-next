import { auth } from '@clerk/nextjs/server';
import { getAuthenticatedUserData } from '@/lib/get-authenticated-user';
import NoAccessPage from '@/app/dashboard/no-access/page';
import { isAdmin } from '@/lib/authorization';

export default async function UserAddLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { userId: clerkUserId } = await auth();
  const user = clerkUserId ? await getAuthenticatedUserData(clerkUserId) : null;

  return <div>{isAdmin(user?.role) ? children : <NoAccessPage />}</div>;
}
