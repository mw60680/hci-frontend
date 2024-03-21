import apiSlice from '..';
import { BASE_URL } from '../constants';

export interface ResponseVendorsDetails {
  id: number;
  active:boolean;
  poc:Poc[];
}
export interface Poc{
  name:string;
  designation:string;
  contact:string;
  email:string;
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
    getVendors: builder.query<ResponseVendorsList, { params: { page: number; size: number } }>({
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
  })
});

export const {useGetVendorsQuery,useGetVendorByIdQuery} = vendorApis;
export default vendorApis; // Exporting the entire clientApis object
