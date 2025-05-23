'use client';

import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import React from 'react';
import { useUser } from '@/context/user-context';

export default function OverViewLayout({
  user_transaction_summary
}: {
  user_transaction_summary: React.ReactNode;
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

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total collected amount</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                ¥1,154,678
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Monthly Saving</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                ¥1,234,567
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Interest collected</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                ¥15,234
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Fine collected</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                ¥5,678
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total loan taken</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                ¥9,123,543
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Remaining balance</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                ¥76,452
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div>{user_transaction_summary}</div>
      </div>
    </PageContainer>
  );
}
