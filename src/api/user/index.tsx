import apiSlice from '..';
import { BASE_URL } from '../constants';

export interface ResponseUsersDetails {
  id: number;
  uuid: string;
  name: string;
  mobile: number;
  email: string;
  dob: string;
  gender: string;
  active: boolean;
  company: { id: number; name: string };
  created_at: string;
  updated_at: string;
}

export interface ResponseUsersList {
  data: ResponseUsersDetails[];
  meta: {
    page: number;
    size: number;
  };
}

const userApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<{ data: ResponseUsersDetails }, void>({
      query: () => ({
        url: `${BASE_URL}/users/token/details`
      })
    }),
    getUsers: builder.query<ResponseUsersList, { params: { page: number; size: number; name?: string } }>({
      query: ({ params }) => ({
        url: `${BASE_URL}/users`,
        params
      })
    }),
    addUsers: builder.mutation<any, any>({
      query: (payload) => ({
        url: `${BASE_URL}/users`,
        body: payload,
        method: 'POST'
      })
    }),
    getUserById: builder.query<any, string>({
      query: (uuid) => ({
        url: `${BASE_URL}/users/${uuid}`
      })
    }),
    updateUser: builder.mutation<any, { uuid: string; payload: any }>({
      query: ({ uuid, payload }) => ({
        url: `${BASE_URL}/users/${uuid}`,
        body: payload,
        method: 'PUT'
      })
    }),
    updatePassword: builder.mutation<
      void,
      { uuid: string; body: { uuid: string; password: string; confirmPassword: string } }
    >({
      query: ({ uuid, body }) => ({
        url: `${BASE_URL}/users/${uuid}/update-password`,
        body: body,
        method: 'PUT'
      })
    })
  })
});

export const {
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useAddUsersMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation
} = userApis;
export default userApis.reducer;
