import UserDetail from '@/features/user/user-detail';
import { getUserDetailAction } from '@/actions';

export default async function UserDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getUserDetailAction({ userId: Number(id) });
  const user = res?.data ?? null;
  const displayName = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(' ')
    .trim()
    .trim();

  return <UserDetail displayName={displayName} />;
}
