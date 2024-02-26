import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  numberOfArticlesPerPage,
} from "@/helpers"

export const articleApi = createApi({
  reducerPath: "articleApi",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles`,
  }),
  endpoints: builder => ({
    getArticles: builder.query({
      query: (pageIndex) => `?pagination[page]=${pageIndex}&pagination[pageSize]=${numberOfArticlesPerPage}&populate=*`,
    }),
    getArticlesBySlug: builder.query({
      query: (slug) => `?filters[slug]=${slug}&populate=*`,
    }),
    getArticlesByCategory: builder.query({
      query: (data) => `?filters[category]=${data.category}&pagination[page]=${data.pageIndex}&pagination[pageSize]=${numberOfArticlesPerPage}&populate=*`,
    }),
  })
})

export const { 
  useGetArticlesQuery, 
  useGetArticlesBySlugQuery,
  useGetArticlesByCategoryQuery,
} = articleApi;