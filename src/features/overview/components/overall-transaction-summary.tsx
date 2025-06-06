'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getOverallTransactionSummaryAction } from '@/actions';
import { OVERALL_TRANSACTION_SUMMARY } from '@/constants/keys';
import React, { useMemo } from 'react';
import { formatCurrency } from '@/lib/format-currency';
import {
  AlertTriangle,
  CreditCard,
  JapaneseYen,
  PiggyBank,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type DataObject = {
  totalMonthlySavings: number;
  totalInterest: number;
  totalFine: number;
  totalCollectedAmount: number;
  totalLoanTaken: number;
  remainingAmount: number;
};

type SanitizedItem = {
  key: string;
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
};

export function OverallUserTransactionSummary() {
  const { data, isLoading } = useQuery({
    queryKey: [OVERALL_TRANSACTION_SUMMARY],
    queryFn: () => getOverallTransactionSummaryAction()
  });

  const transactionSummaryData: SanitizedItem[] = useMemo(() => {
    const summaryData = data?.data as DataObject;

    if (!summaryData) return [];

    return [
      {
        key: 'totalCollectedAmount',
        label: 'Total collected amount',
        icon: <JapaneseYen className='h-5 w-5' />,
        value: summaryData?.totalCollectedAmount || 0,
        color: 'text-green-600',
        trend: 'up'
      },
      {
        key: 'totalMonthlySavings',
        label: 'Total Monthly Saving',
        value: summaryData?.totalMonthlySavings || 0,
        icon: <PiggyBank className='h-5 w-5' />,
        trend: 'up',
        color: 'text-blue-600'
      },
      {
        key: 'totalInterest',
        label: 'Total Interest collected',
        value: summaryData?.totalInterest || 0,
        icon: <TrendingUp className='h-5 w-5' />,
        trend: 'up',
        color: 'text-emerald-600'
      },
      {
        key: 'totalFine',
        label: 'Total Fine collected',
        value: summaryData?.totalFine || 0,
        icon: <AlertTriangle className='h-5 w-5' />,
        trend: 'neutral',
        color: 'text-orange-600'
      },
      {
        key: 'totalLoanTaken',
        label: 'Total loan taken',
        value: summaryData?.totalLoanTaken || 0,
        icon: <CreditCard className='h-5 w-5' />,
        trend: 'down',
        color: 'text-red-600'
      },
      {
        key: 'remainingAmount',
        label: 'Remaining bank balance',
        value: summaryData?.remainingAmount || 0,
        icon: <JapaneseYen className='h-5 w-5' />,
        trend: 'up',
        color: 'text-green-600'
      }
    ];
  }, [data]);

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-8 w-24' />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {transactionSummaryData.map((item) => (
        <Card key={item.key} className='transition-shadow hover:shadow-md'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardDescription className='text-muted-foreground text-base font-semibold uppercase'>
                {item.label}
              </CardDescription>
              <div className={`${item.color}`}>{item.icon}</div>
            </div>
            <CardTitle
              className={`text-2xl font-bold tabular-nums ${item.color}`}
            >
              {formatCurrency(item.value)}
            </CardTitle>
            {item.trend && (
              <div className='text-muted-foreground flex items-center text-xs'>
                {item.trend === 'up' && (
                  <TrendingUp className='mr-1 h-3 w-3 text-green-500' />
                )}
                {item.trend === 'down' && (
                  <TrendingDown className='mr-1 h-3 w-3 text-red-500' />
                )}
                <span>
                  {item.trend === 'up' && 'Positive'}
                  {item.trend === 'down' && 'Liability'}
                  {item.trend === 'neutral' && 'Collected'}
                </span>
              </div>
            )}
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
