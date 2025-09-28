import { auth } from '@clerk/nextjs/server';
import { getAuthenticatedUserData } from '@/lib/get-authenticated-user';
import { UserType } from '@/types/prisma-enums';

export async function checkUserRole() {
  const { userId } = await auth();
  const authenticatedUserData = userId
    ? await getAuthenticatedUserData(userId)
    : null;

  return { role: authenticatedUserData?.role };
}

export function isAdmin(userRole: UserType | undefined) {
  return userRole === UserType.ADMIN;
}
