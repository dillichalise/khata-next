'use client';

import { useParams } from 'next/navigation';
import UserAccountSummary from '@/features/overview/components/user-account-summary';

export default function UserSummary() {
  const { id } = useParams();

  return (
    <div>
      <UserAccountSummary userId={Number(id)} />
    </div>
  );
}
