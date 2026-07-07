import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAuthModalOpen: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = { ...action.payload.user, token: action.payload.token };
      state.isAuthenticated = true;
      state.isAuthModalOpen = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    toggleAuthModal: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.isAuthModalOpen = action.payload;
      } else {
        state.isAuthModalOpen = !state.isAuthModalOpen;
      }
    },
  },
});

export const { setCredentials, logout, toggleAuthModal } = authSlice.actions;

export default authSlice.reducer;
