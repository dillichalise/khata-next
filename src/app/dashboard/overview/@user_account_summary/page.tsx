import UserAccountSummary from '@/features/overview/components/user-account-summary';
import { auth } from '@clerk/nextjs/server';
import { getAuthenticatedUserData } from '@/lib/get-authenticated-user';

export default async function UserAccountSummaryPage() {
  const { userId: clerkUserId } = await auth();
  const user = clerkUserId ? await getAuthenticatedUserData(clerkUserId) : null;

  return <UserAccountSummary userId={user?.id} />;
}
