'use client';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getCurrentUserRoleAction } from '@/actions';
import { CURRENT_USER_ROLE } from '@/constants/keys';

type RoleResponse = Awaited<ReturnType<typeof getCurrentUserRoleAction>>;

export function useIsAdmin(
  options?: Omit<
    UseQueryOptions<RoleResponse, Error, RoleResponse, [string]>,
    'queryKey' | 'queryFn'
  >
) {
  const query = useQuery<RoleResponse, Error, RoleResponse, [string]>({
    queryKey: [CURRENT_USER_ROLE],
    queryFn: () => getCurrentUserRoleAction(),
    staleTime: 5 * 60 * 1000,
    ...options
  });

  const role = query.data?.data?.role;
  const isAdmin = role === 'ADMIN';

  return {
    ...query,
    isAdmin,
    role
  };
}
