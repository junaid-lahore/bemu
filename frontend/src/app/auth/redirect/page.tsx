'use client';

import { Suspense } from 'react';
import { LoginRedirect } from '../LoginRedirect';

export default function AuthRedirectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginRedirect />
    </Suspense>
  );
}


