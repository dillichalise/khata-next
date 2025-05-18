'use client';

import { createContext, useContext } from 'react';
import { User } from '@prisma/client';

type UserContextType = {
  user: User | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  user,
  children
}: {
  user: User | null;
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
