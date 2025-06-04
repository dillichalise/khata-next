import { createSafeActionClient } from 'next-safe-action';
import { checkUserAdminPermission } from '@/lib/authorization';
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
  const { role } = await checkUserAdminPermission();

  return next({
    ctx: {
      ...ctx,
      role
    }
  });
});
