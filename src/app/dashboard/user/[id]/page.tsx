import UserDetail from '@/features/user/user-detail';
import { getUserDetailAction } from '@/actions';

export default async function UserDetailPage({
  params
}: {
  params: { id: string };
}) {
  const res = await getUserDetailAction({ userId: Number(params.id) });
  const user = res?.data ?? null;
  const displayName = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(' ')
    .trim()
    .trim();

  return <UserDetail displayName={displayName} />;
}
