'use client';

import PageContainer from '@/components/layout/page-container';
import React from 'react';
import { useUser } from '@/context/user-context';

export default function OverViewLayout({
  user_transaction_summary,
  overall_transaction_summary
}: {
  user_transaction_summary: React.ReactNode;
  overall_transaction_summary: React.ReactNode;
}) {
  const { user } = useUser();

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi {user?.firstName}, Welcome back 👋
          </h2>
        </div>

        <div>{overall_transaction_summary}</div>

        <div>{user_transaction_summary}</div>
      </div>
    </PageContainer>
  );
}
