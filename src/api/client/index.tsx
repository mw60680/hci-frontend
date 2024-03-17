import apiSlice from '..';
import { BASE_URL } from '../constants';

export interface ResponseClientsDetails {
  id: number;
  companyName:string;
  legalName:string;
  contractStartDate:string
  contractEndDate:string;
  active:boolean;
  apiIntergarted:boolean;
  gstNumber:string;
  poc:Poc[];
}
export interface Poc{
  name:string;
  designation:string;
  contact:string;
  email:string;
}
export interface ResponseClientsList {
  data: ResponseClientsDetails[];
  meta: {
    page: number;
    size: number;
  };
}
const clientApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addClients: builder.mutation<any, any>({
      query: (payload) => ({
        url: `${BASE_URL}/clients`,
        body: payload,
        method: 'POST'
      })
    }),
    getClients: builder.query<ResponseClientsList, { params: { page: number; size: number } }>({
      query: ({ params }) => ({
        url: `${BASE_URL}/clients`,
        params
      })
    }),
    getClientById: builder.query<any, string>({ 
      query: (uuid) => ({ 
        url: `${BASE_URL}/clients/${uuid}` 
      })
    }),
    updateClient : builder.mutation<any, { uuid: string; payload: any }>({ 
      query: ({ uuid, payload }) => ({
        url: `${BASE_URL}/clients/${uuid}`, 
        body: payload, 
        method: 'PUT'
      })
    })
  })
});

export const { useAddClientsMutation ,useGetClientsQuery,useGetClientByIdQuery,useUpdateClientMutation} = clientApis;
export default clientApis; // Exporting the entire clientApis object
