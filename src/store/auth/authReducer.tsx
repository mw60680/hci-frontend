import { createSlice } from '@reduxjs/toolkit';
import { ResponseUsersDetails } from '../../api/user';

const appSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    stage: 'UNAUTHENTICATED',
    userId: null
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
      state.stage = action.payload.stage;
      state.userId = action.payload.userId;
    },
    reset: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.userId = null;
      state.stage = 'UNAUTHENTICATED';
      localStorage.removeItem('token');
    }
  }
});

// actions
export const { setAuthenticated, reset } = appSlice.actions;

// selector
export const selectLoggedIn = (state: { auth: { isLoggedIn: boolean } }) => state.auth.isLoggedIn;

export const selectLoginInUser = (state: { auth: { user: ResponseUsersDetails } }) => state.auth.user;

// reducer
export default appSlice.reducer;
