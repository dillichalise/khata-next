import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserMonthlySaving from '@/features/user/transactions/monthly-saving';
import UserLoan from '@/features/user/transactions/user-loan';
import UserSummary from '@/features/user/components/user-summary';

export default function UserDetail() {
  return (
    <Tabs defaultValue='summary' className='m-4 w-full'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='saving'>Monthly Savings</TabsTrigger>
        <TabsTrigger value='loan'>Loan</TabsTrigger>
        <TabsTrigger value='summary'>Summary</TabsTrigger>
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
  );
}
