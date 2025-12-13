'use client';

import { StackHandler } from '@stackframe/react';
import { usePathname } from 'next/navigation';
import { stackClientApp } from '../stack';
import { joinPaths } from '../utils';

export default function StackHandlerPage() {
  const pathname = usePathname();

  return (
    <StackHandler
      app={stackClientApp}
      location={pathname || ''}
      fullPage={true}
    />
  );
}


