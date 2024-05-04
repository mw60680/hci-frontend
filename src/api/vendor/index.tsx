import apiSlice from '..';
import { BASE_URL } from '../constants';

export interface ResponseVendorsDetails {
  id: number;
  uuid: string;
  name: string;
  active: boolean;
  poc: Poc[];
}
export interface Poc {
  name: string;
  designation: string;
  contact: string;
  email: string;
}
export interface ResponseVendorsList {
  data: ResponseVendorsDetails[];
  meta: {
    page: number;
    size: number;
  };
}
const vendorApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query<ResponseVendorsList, { params: { page: number; size: number; name?: string } }>({
      query: ({ params }) => ({
        url: `${BASE_URL}/vendors`,
        params
      })
    }),
    getVendorById: builder.query<any, string>({
      query: (uuid) => ({
        url: `${BASE_URL}/vendors/${uuid}`
      })
    }),
    addVendor: builder.mutation<any, any>({
      query: (payload) => ({
        url: `${BASE_URL}/vendors`,
        body: payload,
        method: 'POST'
      })
    }),
    updateVendor: builder.mutation<any, { uuid: string; payload: any }>({
      query: ({ uuid, payload }) => ({
        url: `${BASE_URL}/vendors/${uuid}`,
        body: payload,
        method: 'PUT'
      })
    })
  })
});

export const {
  useGetVendorsQuery,
  useLazyGetVendorsQuery,
  useGetVendorByIdQuery,
  useAddVendorMutation,
  useUpdateVendorMutation
} = vendorApis;
export default vendorApis; // Exporting the entire clientApis object
