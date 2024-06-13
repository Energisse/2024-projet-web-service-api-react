import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Movie } from './movies'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081', credentials: "include" }),
    endpoints: (builder) => ({}),
})
