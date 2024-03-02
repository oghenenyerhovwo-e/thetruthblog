import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authorApi = createApi({
  reducerPath: "authorApi",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/authors`,
  }),
  endpoints: builder => ({
    getAuthorById: builder.query({
      query: (authorId) => `/${authorId}?populate=profilePic`,
    }),
  })
})

export const { 
  useGetAuthorByIdQuery,
} = authorApi;