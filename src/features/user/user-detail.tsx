import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserMonthlySaving from '@/features/user/transactions/monthly-saving';
import UserLoan from '@/features/user/transactions/user-loan';

export default function UserDetail() {
  return (
    <Tabs defaultValue='saving' className='m-4 w-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='saving'>Monthly Savings</TabsTrigger>
        <TabsTrigger value='loan'>Loan</TabsTrigger>
      </TabsList>
      <TabsContent value='saving'>
        <UserMonthlySaving />
      </TabsContent>

      <TabsContent value='loan'>
        <UserLoan />
      </TabsContent>
    </Tabs>
  );
}
