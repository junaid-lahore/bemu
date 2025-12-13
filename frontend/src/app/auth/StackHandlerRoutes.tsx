'use client';

import { APP_BASE_PATH } from '@/constants';
import { StackHandler } from '@stackframe/react';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { stackClientApp } from './stack';
import { joinPaths } from './utils';

export const StackHandlerRoutes = () => {
  const pathname = usePathname();

  return (
    <StackHandler
      app={stackClientApp}
      location={joinPaths(APP_BASE_PATH, pathname || '')}
      fullPage={true}
    />
  );
}