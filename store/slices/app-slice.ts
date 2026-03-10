import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  sidebarOpen: boolean;
}

const initialState: AppState = {
  sidebarOpen: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

const { setSidebarOpen, toggleSidebar } = appSlice.actions;

export { setSidebarOpen, toggleSidebar };
export default appSlice.reducer;
