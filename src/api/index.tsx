import { createApi, BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react';
import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import customFetchBase from './common/custom-fetch-base';

interface CustomError {
  data: {
    error?: string;
    message?: string;
  };
  message?: string;
}

const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: [],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  baseQuery: customFetchBase as BaseQueryFn<any>,
  refetchOnFocus: true,
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: true,
  // Set a global staleTime for all queries
  keepUnusedDataFor: 300000, // 5 minutes in milliseconds
  endpoints: (build) => ({
    pokemon: build.query({
      query: (payload) => `pokemon/${payload}`
    })
  })
});

export const apiMiddleware: Middleware = (_store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // TODO - Replace this with better error handling cases
    if (action?.payload?.status === 401) {
      // Error handling missing
    }
  }
  return next(action);
};

export const { usePokemonQuery } = apiSlice;

export default apiSlice;
