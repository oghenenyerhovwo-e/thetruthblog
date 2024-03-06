import {
    articleApi,
    useGetArticlesQuery,
    useGetArticlesBySlugQuery,
    useGetArticlesByCategoryQuery,
    useGetArticlesByUserQuery,
} from "./articleApi"

import {
    commentApi,
    usePostCommentMutation,
} from "./commentApi"

import {
    authorApi,
    useGetAuthorByIdQuery,
} from "./authorApi.js"

export {
    articleApi,
    useGetArticlesQuery,
    useGetArticlesBySlugQuery,
    useGetArticlesByCategoryQuery,
    useGetArticlesByUserQuery,

    commentApi,
    usePostCommentMutation,

    authorApi,
    useGetAuthorByIdQuery,
}