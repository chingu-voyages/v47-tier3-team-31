'use client';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import React, { useContext } from 'react';
import { AuthStatus } from './auth-status';

type UpdateSession = (data?: any) => Promise<Session | null>;
interface IAuthenticationContext {
  status: AuthStatus | string;
  session: Session | null;
  update: UpdateSession | null;
}

const AuthenticationContext = React.createContext<IAuthenticationContext>({
  status: AuthStatus.Unauthenticated as string,
  session: null,
  update: null,
}); // Creating the  context

export const AuthenticationSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status, update } = useSession();

  return (
    <AuthenticationContext.Provider
      value={{
        status,
        session,
        update,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error('useOnboardingContext must be inside a OnboardingProvider');
  }
  return context;
};
