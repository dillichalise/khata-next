import UserForm from '@/features/user/create-user-form';
import { currentUser } from '@clerk/nextjs/server';
import { UserType } from '@prisma/client';

export default async function AddUserPage() {
  const user = await currentUser();
  const userData = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.emailAddresses[0].emailAddress || '',
    phoneNumber: '',
    clerkUserId: user?.id || '',
    role: UserType.USER
  };

  return (
    <div>
      <UserForm initialData={userData} pageTitle={'Register User'} />
    </div>
  );
}
