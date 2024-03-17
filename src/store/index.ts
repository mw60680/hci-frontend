import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authReducer';
import apiSlice, { apiMiddleware } from '../api';

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  }),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware, apiSlice.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { auth: AuthState, clientApis: ClientApisState, posts: PostsState, comments: CommentsState, users: UsersState }
export type AppDispatch = typeof store.dispatch;

export default store;
