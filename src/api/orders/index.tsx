import apiSlice from '..';
import { BASE_URL } from '../constants';
import { ICreateOrderRequest } from '../types/request/orders';
import { IOrdersListResponse } from '../types/response/orders';

const ordersApis = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    ordersList: build.query<IOrdersListResponse, { params?: any }>({
      query: (payload) => ({
        url: `${BASE_URL}/orders`,
        params: payload.params
      })
    }),
    createOrder: build.mutation<void, { body: ICreateOrderRequest }>({
      query: (payload) => ({
        url: `${BASE_URL}/orders`,
        method: 'POST',
        body: payload.body,
        responseHandler: (response: any) => response.text()
      })
    })
  })
});

export const { useOrdersListQuery, useCreateOrderMutation } = ordersApis;
