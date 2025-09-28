'use client';

import { createContext, useContext } from 'react';
import type { TUserSchema } from '@/schema/user.schema';

type UserContextType = {
  user: TUserSchema | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  user,
  children
}: {
  user: TUserSchema | null;
  children: React.ReactNode;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
