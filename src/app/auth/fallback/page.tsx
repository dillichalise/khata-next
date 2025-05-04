import { getAuthenticatedUserData } from '@/lib/get-authenticated-user';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserType } from '@prisma/client';
import UserForm from '@/features/user/create-user-form';

export default async function PostLoginOperation() {
  const { userId, sessionId } = await auth();
  let userData;

  if (userId && sessionId) {
    const authenticatedUserData = userId
      ? await getAuthenticatedUserData(userId)
      : null;
    if (authenticatedUserData) {
      redirect('/');
    }
    const user = await currentUser();
    userData = {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.emailAddresses[0].emailAddress || '',
      phoneNumber: '',
      clerkUserId: user?.id || '',
      role: UserType.USER
    };
  }

  if (!userData)
    return (
      <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0'>
        <div className='flex h-full items-center justify-center p-4 lg:p-8'>
          <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
            Signing In User...
          </div>
        </div>
      </div>
    );

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0'>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <UserForm initialData={userData} pageTitle={'Register user'} />
        </div>
      </div>
    </div>
  );
}
