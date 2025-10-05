'use client';

import { useState, useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UserStatus } from '@/types/prisma-enums';
import { updateUserAction } from '@/actions';
import { useQueryClient } from '@tanstack/react-query';
import { USERS } from '@/constants/keys';

type Props = {
  userId: number;
  value: UserStatus;
  editable?: boolean;
};

export function UserStatusCell({ userId, value, editable = false }: Props) {
  const [pending, startTransition] = useTransition();
  const [internal, setInternal] = useState(value ?? UserStatus.INACTIVE);
  const qc = useQueryClient();

  const onChange = (next: string) => {
    if (!editable) return;
    const nextStatus = next as keyof typeof UserStatus;

    setInternal(nextStatus);

    startTransition(async () => {
      try {
        await updateUserAction({ id: userId, status: nextStatus });
        // Refresh the users list
        await qc.invalidateQueries({ queryKey: [USERS] });
      } catch (e) {
        // rollback UI if failed
        setInternal(value ?? UserStatus.INACTIVE);
        // eslint-disable-next-line no-console
        console.error('Failed to update user status', e);
      }
    });
  };

  if (!editable) {
    return (
      <Badge variant={internal === 'ACTIVE' ? 'success' : 'destructive'}>
        {internal}
      </Badge>
    );
  }

  return (
    <Select value={internal} onValueChange={onChange} disabled={pending}>
      <SelectTrigger className='h-8 w-[130px] cursor-pointer'>
        <Badge variant={internal === 'ACTIVE' ? 'success' : 'destructive'}>
          {internal}
        </Badge>
      </SelectTrigger>
      <SelectContent>
        <SelectItem className='cursor-pointer' value={UserStatus.ACTIVE}>
          <Badge variant='success'>{UserStatus.ACTIVE}</Badge>
        </SelectItem>
        <SelectItem className='cursor-pointer' value={UserStatus.INACTIVE}>
          <Badge variant='destructive'>{UserStatus.INACTIVE}</Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
