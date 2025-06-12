import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getAuthenticatedUserData } from '@/lib/get-authenticated-user';
import { auth } from '@clerk/nextjs/server';
import NoAccessPage from '@/app/dashboard/no-access/page';
import { UserStatus } from '@prisma/client';
import { UserProvider } from '@/context/user-context';
import MobileNav from '@/components/layout/mobile-nav';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  const { userId: clerkUserId } = await auth();
  const user = clerkUserId ? await getAuthenticatedUserData(clerkUserId) : null;

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <UserProvider user={user}>
            {/* page main content */}
            {user && user.status === UserStatus.ACTIVE ? (
              <div className='pb-12'>{children}</div>
            ) : (
              <NoAccessPage />
            )}
            <MobileNav />
            {/* page main content ends */}
          </UserProvider>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
