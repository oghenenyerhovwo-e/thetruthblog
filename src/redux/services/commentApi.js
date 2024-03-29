import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const commentApi = createApi({
  reducerPath: "commentApi",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/comments`,
  }),
  endpoints: builder => ({
    postComment: builder.mutation({
      query: (body) => ({
        url: `/`,
        method: "POST",
        body,
        header: {"Content-Type": "application/json"}
      }),
    }),
  })
})

export const { 
  usePostCommentMutation,
} = commentApi;