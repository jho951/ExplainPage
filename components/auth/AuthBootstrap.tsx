'use client';

import { useEffect } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { setAuthState } from '@/store/slices/auth-slice';
import { fetchAuthMe } from '@/libs/auth-client';

function AuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let cancelled = false;

    dispatch(
      setAuthState({
        user: null,
        status: 'loading',
        initialized: false,
        error: null,
      }),
    );

    const bootstrap = async () => {
      try {
        const user = await fetchAuthMe();

        if (cancelled) {
          return;
        }

        dispatch(
          setAuthState({
            user,
            status: 'authenticated',
            initialized: true,
            error: null,
          }),
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        dispatch(
          setAuthState({
            user: null,
            status: 'anonymous',
            initialized: true,
            error: error instanceof Error ? error.message : 'Failed to load auth session.',
          }),
        );
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return null;
}

export { AuthBootstrap };
