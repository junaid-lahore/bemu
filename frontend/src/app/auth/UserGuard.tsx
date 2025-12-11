'use client';

import { APP_BASE_PATH } from "@/constants";
import {
  type CurrentInternalServerUser,
  type CurrentUser,
  useStackApp,
  useUser,
} from "@stackframe/react";
import type * as React from "react";
import { createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

type UserGuardContextType = {
  user: CurrentUser | CurrentInternalServerUser;
};

const UserGuardContext = createContext<UserGuardContextType | undefined>(
  undefined,
);

/**
 * Hook to access the logged in user from within a <UserGuard> component.
 */
export const useUserGuardContext = () => {
  const context = useContext(UserGuardContext);

  if (context === undefined) {
    throw new Error("useUserGuardContext must be used within a <UserGuard>");
  }

  return context;
};

const writeToLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem(key, value);
  }
};

export const UserGuard = (props: {
  children: React.ReactNode;
}) => {
  const app = useStackApp();
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);

      // Don't set the next param if the user is logging out
      // to avoid ending up in an infinite redirect loop
      if (pathname !== app.urls.signOut) {
        writeToLocalStorage("dtbn-login-next", pathname || '/');
        queryParams.set("next", pathname || '/');
      }

      const queryString = queryParams.toString();
      const signInUrl = `${app.urls.signIn.replace(APP_BASE_PATH, "/").replace("//", "/")}?${queryString}`;
      router.replace(signInUrl);
    }
  }, [user, pathname, router, app.urls.signIn, app.urls.signOut]);

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <UserGuardContext.Provider value={{ user }}>
      {props.children}
    </UserGuardContext.Provider>
  );
};
