import { createSafeActionClient } from 'next-safe-action';
import { checkUserRole, isAdmin } from '@/lib/authorization';
import { auth } from '@clerk/nextjs/server';

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next, ctx }) => {
  const { userId } = await auth();
  if (!userId) throw new Error('You must be logged in to perform this action.');

  return next({
    ctx: {
      ...ctx,
      userId
    }
  });
});

export const authAdminClient = authActionClient.use(async ({ next, ctx }) => {
  const { role } = await checkUserRole();

  if (!isAdmin(role)) throw new Error('Unauthorized');

  return next({
    ctx: {
      ...ctx,
      role
    }
  });
});
