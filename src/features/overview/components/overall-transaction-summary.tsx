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
};

export function OverallUserTransactionSummary() {
  const { data } = useQuery({
    queryKey: [OVERALL_TRANSACTION_SUMMARY],
    queryFn: () => getOverallTransactionSummaryAction()
  });

  const transactionSummaryData: SanitizedItem[] = useMemo(() => {
    const summaryData = data?.data as DataObject;

    return [
      {
        key: 'totalCollectedAmount',
        label: 'Total collected amount',
        value: summaryData?.totalCollectedAmount || 0
      },
      {
        key: 'totalMonthlySavings',
        label: 'Total Monthly Saving',
        value: summaryData?.totalMonthlySavings || 0
      },
      {
        key: 'totalInterest',
        label: 'Total Interest collected',
        value: summaryData?.totalInterest || 0
      },
      {
        key: 'totalFine',
        label: 'Total Fine collected',
        value: summaryData?.totalFine || 0
      },
      {
        key: 'totalLoanTaken',
        label: 'Total loan taken',
        value: summaryData?.totalLoanTaken || 0
      },
      {
        key: 'remainingAmount',
        label: 'Remaining bank balance',
        value: summaryData?.remainingAmount || 0
      }
    ].filter((item) => item.label);
  }, [data]);

  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
      {transactionSummaryData.map((item) => (
        <Card key={item.key} className='@container/card'>
          <CardHeader>
            <CardDescription className='text-base font-semibold'>
              {item.label}
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {formatCurrency(item.value)}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
