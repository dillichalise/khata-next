'use client';

import PageContainer from '@/components/layout/page-container';
import React from 'react';
import { useUser } from '@/context/user-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export default function OverViewLayout({
  overall_transaction_summary,
  user_account_summary
}: {
  overall_transaction_summary: React.ReactNode;
  user_account_summary: React.ReactNode;
}) {
  const { user } = useUser();
  const isMobile = useIsMobile();

  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi {user?.firstName}, Welcome back 👋
          </h2>
        </div>
        {(user?.email === 'sagarfullel@gmail.com' ||
          user?.email === 'dillichalise@gmail.com') && (
          <Link
            className={cn(isMobile && 'flex flex-col')}
            href='/dashboard/external-transaction'
          >
            <Button variant='outline'>View External Transaction</Button>
          </Link>
        )}

        <div>{user_account_summary}</div>
        <div className='mb-4'>{overall_transaction_summary}</div>
      </div>
    </PageContainer>
  );
}
