'use client';

import type { UserType } from '@/types/prisma-enums';
import { useForm } from 'react-hook-form';
import { createUserSchema, TCreateUserSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createUserAction } from '@/actions';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';

export default function UserForm({
  initialData,
  pageTitle
}: {
  initialData: TCreateUserSchema | null;
  pageTitle: string;
}) {
  const router = useRouter();

  const defaultValues = {
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phoneNumber: initialData?.phoneNumber || '',
    clerkUserId: initialData?.clerkUserId || '',
    role: initialData?.role as UserType
  };

  const form = useForm<TCreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    values: defaultValues
  });

  const { executeAsync, isExecuting, isPending } = useAction(createUserAction);

  async function onSubmit(submitValue: TCreateUserSchema) {
    executeAsync(submitValue)
      .then(() => {
        router.push('/dashboard/user');
      })
      .catch((err) => {
        console.error('Error while registering user', err);
      });
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='clerkUserId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden={true}>Clerk User Id</FormLabel>
                  <FormControl>
                    <Input {...field} hidden={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter first name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter last name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter email address' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter phone number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className='bg-blue-700 hover:cursor-pointer hover:bg-blue-900'
              disabled={isPending || isExecuting}
              type='submit'
            >
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
