import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

export function UserTransactionsSummarySkeleton() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <Skeleton className='h-6 w-[140px]' /> {/* CardTitle */}
        <Skeleton className='h-4 w-[180px]' /> {/* CardDescription */}
      </CardHeader>

      <CardContent>
        <div className='space-y-8'>
          <DataTableSkeleton columnCount={5} />
        </div>
      </CardContent>
    </Card>
  );
}
