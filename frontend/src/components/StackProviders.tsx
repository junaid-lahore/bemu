'use client';

import { StackProvider, StackTheme } from '@stackframe/react';
import { stackClientApp } from '@/app/auth';

interface StackProvidersProps {
  children: React.ReactNode;
}

export function StackProviders({ children }: StackProvidersProps) {
  return (
    <StackProvider app={stackClientApp}>
      <StackTheme>
        {children}
      </StackTheme>
    </StackProvider>
  );
}

