'use client';

import { type ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

import { makeStore, type AppStore } from '@/store';

function ReduxProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export { ReduxProvider };
