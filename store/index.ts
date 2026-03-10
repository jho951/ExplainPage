import { configureStore } from '@reduxjs/toolkit';

import appReducer from '@/store/slices/app-slice';

const makeStore = () =>
  configureStore({
    reducer: {
      app: appReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

type AppStore = ReturnType<typeof makeStore>;
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

export { makeStore };
export type { AppStore, RootState, AppDispatch };
