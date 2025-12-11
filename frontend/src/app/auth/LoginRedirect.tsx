'use client';

import { useStackApp } from "@stackframe/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const popFromLocalStorage = (key: string): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const value = localStorage.getItem(key);
    localStorage.removeItem(key);
    return value;
  }

  return null;
};


export const LoginRedirect = () => {
  const app = useStackApp();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const next = searchParams.get('next') || popFromLocalStorage('dtbn-login-next');
    router.replace(next || '/');
  }, [router, searchParams]);

  return null;
};