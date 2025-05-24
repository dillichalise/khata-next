import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function UserAccountSummarySkeleton() {
  return (
    <div className='mb-4 flex w-full flex-col gap-2 text-lg font-semibold'>
      <Card className='w-full bg-yellow-700'>
        <Skeleton className='w-full' /> {/* CardTitle */}
      </Card>

      <Card className='w-full bg-red-700'>
        <Skeleton className='w-full' /> {/* CardTitle */}
      </Card>
    </div>
  );
}
