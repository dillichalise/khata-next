import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserMonthlySaving from '@/features/user/transactions/monthly-saving';
import UserLoan from '@/features/user/transactions/user-loan';
import UserSummary from '@/features/user/components/user-summary';

export default function UserDetail({ displayName }: { displayName: string }) {
  return (
    <div className='m-4 w-full space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold tracking-tight'>
          {displayName || 'User'}
        </h2>
      </div>

      <Tabs defaultValue='summary' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger
            className='hover:bg-primary cursor-pointer'
            value='saving'
          >
            Monthly Savings
          </TabsTrigger>
          <TabsTrigger className='hover:bg-primary cursor-pointer' value='loan'>
            Loan
          </TabsTrigger>
          <TabsTrigger
            className='hover:bg-primary cursor-pointer'
            value='summary'
          >
            Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value='saving'>
          <UserMonthlySaving />
        </TabsContent>

        <TabsContent value='loan'>
          <UserLoan />
        </TabsContent>

        <TabsContent value='summary'>
          <UserSummary />
        </TabsContent>
      </Tabs>
    </div>
  );
}
