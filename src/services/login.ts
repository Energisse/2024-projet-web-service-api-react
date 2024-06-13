import { api } from './api'

const enhancedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<string, { username: string, password: string }>({
      query: (body) => ({
        url: `authentification/login`,
        method: 'POST',
        body,
      }),
    }),
  })
})

export const { useLoginMutation } = enhancedApi