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
      query: (pageIndex) => `?sort[0]=createdAt:desc&pagination[page]=${pageIndex}&pagination[pageSize]=${numberOfArticlesPerPage}&populate=*`,
    }),
    getArticlesBySlug: builder.query({
      query: (params) => `?filters[slug]=${params.slug}&populate=*`,
    }),
    getArticlesByCategory: builder.query({
      query: (params) => `?sort[0]=createdAt:desc&filters[category]=${params.category}&pagination[page]=${params.pageIndex}&pagination[pageSize]=${numberOfArticlesPerPage}&populate=*`,
    }),
    getArticlesByUser: builder.query({
      query: (params) => `?sort[0]=createdAt:desc&populate=*&filters[author][id]=${params.authorId}&pagination[page]=${params.pageIndex}&pagination[pageSize]=${numberOfArticlesPerPage}`,
    }),
  })
})

export const { 
  useGetArticlesQuery, 
  useGetArticlesBySlugQuery,
  useGetArticlesByCategoryQuery,
  useGetArticlesByUserQuery,
} = articleApi;