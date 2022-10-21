import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {SearchRequest, SearchResponce } from './types';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://autocomplete.clearbit.com/v1/'
    }),
    endpoints: (builder) => ({
        getData: builder.query<SearchResponce, SearchRequest>({
            query: (params) => ({
                 url: 'companies/suggest',
                 params
            })
        }),
    })
})

export const {useLazyGetDataQuery} = api;
