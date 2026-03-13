'use client';

import { type ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/constants/locale';
import { buildStartFrontendSignInUrl } from '@/libs/auth-routing';
import { useAppSelector } from '@/store/hooks';

interface AuthGateProps {
  children: ReactNode;
}

const normalizePath = (pathname: string) =>
  pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

const stripLocalePrefix = (pathname: string) => {
  const normalized = normalizePath(pathname);
  const segments = normalized.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (
    firstSegment &&
    SUPPORTED_LOCALES.includes(firstSegment as (typeof SUPPORTED_LOCALES)[number])
  ) {
    const strippedPath = `/${segments.slice(1).join('/')}`;
    return normalizePath(strippedPath || '/');
  }

  return normalized;
};

const isProtectedPath = (pathname: string) => {
  const strippedPath = stripLocalePrefix(pathname);
  return strippedPath === '/app' || strippedPath.startsWith('/app/');
};

function AuthGate({ children }: AuthGateProps) {
  const pathname = usePathname() ?? '/';
  const { initialized, status } = useAppSelector(state => state.auth);
  const protectedPath = isProtectedPath(pathname);

  useEffect(() => {
    if (!protectedPath || !initialized || status !== 'anonymous') {
      return;
    }

    const nextPath = pathname || `/${DEFAULT_LOCALE}`;
    window.location.replace(buildStartFrontendSignInUrl(nextPath));
  }, [initialized, pathname, protectedPath, status]);

  if (protectedPath && (!initialized || status === 'loading')) {
    return null;
  }

  return <>{children}</>;
}

export { AuthGate };
