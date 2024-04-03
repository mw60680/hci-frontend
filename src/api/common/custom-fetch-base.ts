import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { endpoint }) => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh-token');
    const excludeEndpoints = ['/sign-in'];
    const isExcludedEndpoint = excludeEndpoints.includes(endpoint?.toUpperCase() ?? '');

    if (!isExcludedEndpoint && token && refreshToken) {
      headers.set('authorization', token);
      headers.set('Cookie', `refreshToken=${refreshToken}`);
    }
    headers.set('Client-Device', window?.navigator?.userAgent);
    headers.set('Content-Type', 'application/json');
    return headers;
  }
});

const customFetchBase = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  const responseStatus = result.meta?.response?.status;

  if (responseStatus === 401) {
    // Error handling
  }

  return result;
};

export default customFetchBase;
