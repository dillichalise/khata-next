import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function UserAccountSummarySkeleton() {
  return (
    <div className='mr-6 mb-4 flex flex-col gap-2 text-lg font-semibold'>
      {/* Account Status Cards */}
      <div className='grid gap-3'>
        {/* Simulate one of the status cards (yellow/red/green) */}
        <Card>
          <CardContent className='flex items-center gap-3 p-4'>
            <Skeleton className='h-5 w-5 rounded' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-1/4 rounded' />
              <Skeleton className='h-6 w-1/2 rounded' />
              <Skeleton className='h-3 w-1/3 rounded' />
            </div>
          </CardContent>
        </Card>

        {/* Payment Schedule Card Skeleton */}
        <Card className='bg-muted/50'>
          <CardContent className='p-4'>
            <div className='mb-3 flex items-center gap-2'>
              <Skeleton className='h-4 w-4 rounded' />
              <Skeleton className='h-4 w-24 rounded' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Skeleton className='h-3 w-16 rounded' />
                <Skeleton className='h-5 w-full rounded' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-3 w-16 rounded' />
                <Skeleton className='h-5 w-full rounded' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
