import { getAuthenticatedUserData } from '@/lib/get-authenticated-user';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function PostLoginOperation() {
  const { userId, sessionId } = await auth();

  if (userId && sessionId) {
    const userData = userId ? await getAuthenticatedUserData(userId) : null;
    if (userData) {
      redirect('/');
    }
    // TODO: Show register user form if userData is not available
  }

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0'>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          Signing In User...
        </div>
      </div>
    </div>
  );
}
