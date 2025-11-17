import { auth } from '@clerk/nextjs/server';
import { getAuthenticatedUserData } from '@/lib/get-authenticated-user';
import NoAccessPage from '@/app/dashboard/no-access/page';
import React from 'react';

export default async function ExternalTransactionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { userId: clerkUserId } = await auth();
  const user = clerkUserId ? await getAuthenticatedUserData(clerkUserId) : null;

  if (
    user?.email === 'dillichalise@gmail.com' ||
    user?.email === 'sagarfullel@gmail.com'
  )
    return <div>{children}</div>;

  return <NoAccessPage />;
}
