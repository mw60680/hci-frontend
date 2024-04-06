import apiSlice from '..';
import { BASE_URL } from '../constants';
import { ICreateOrderRequest, IOrdersListRequest } from '../types/request/orders';
import { IOrderDetailsResponse, IOrdersListResponse } from '../types/response/orders';

const ordersApis = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    ordersList: build.query<IOrdersListResponse, { params?: Partial<IOrdersListRequest> }>({
      query: (payload) => ({
        url: `${BASE_URL}/orders`,
        params: payload.params
      })
    }),
    createOrder: build.mutation<{ uuid: string }, { body: ICreateOrderRequest }>({
      query: (payload) => ({
        url: `${BASE_URL}/orders`,
        method: 'POST',
        body: payload.body
      })
    }),
    updateOrder: build.mutation<{ uuid: string }, { uuid: string; body: ICreateOrderRequest }>({
      query: (payload) => ({
        url: `${BASE_URL}/orders/${payload.uuid}`,
        method: 'PUT',
        body: payload.body
      })
    }),
    orderDetails: build.query<IOrderDetailsResponse, { uuid: string }>({
      query: (payload) => ({
        url: `${BASE_URL}/orders/${payload.uuid}`
      })
    })
  })
});

export const { useOrdersListQuery, useCreateOrderMutation, useUpdateOrderMutation, useOrderDetailsQuery } = ordersApis;
