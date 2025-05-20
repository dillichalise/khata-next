'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getUserTransactionSummaryAction } from '@/actions/user-summary';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export function UserTransactionSummary() {
  const { data } = useQuery({
    queryKey: [],
    queryFn: () => getUserTransactionSummaryAction()
  });

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Transactions Summary</CardTitle>
        <CardDescription>Summary of User transactions.</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UserId</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Total Saving</TableHead>
              <TableHead>Total Interest Paid</TableHead>
              <TableHead>Total Fine Paid</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.totalSavings}</TableCell>
                <TableCell>{user.totalInterestPaid}</TableCell>
                <TableCell>{user.totalFinePaid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
