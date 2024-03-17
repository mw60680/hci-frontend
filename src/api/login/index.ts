import { BASE_URL } from '../constants';
import apiSlice from '../index';

interface RequestLoginMobile {
  type: string;
  password: string;
  mobile?: number;
  email?: string;
}
interface ResponseGetUser {
  userDetails: {
    _id: string;
    uuid: string;
    name: string;
    email: string;
    mobile: number;
    dob: string;
    user_type: string;
    active: boolean;
    city: string;
    employment_type: string;
  };
  auth: {
    token: string;
    refreshToken: string;
  };
}

const loginApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseGetUser, RequestLoginMobile>({
      query: (payload) => ({
        url: `${BASE_URL}/signin`,
        body: payload,
        method: 'POST'
      })
    })
  })
});

export const { useLoginMutation } = loginApis;
export default loginApis.reducer;
