import {
    articleApi,
    useGetArticlesQuery,
    useGetArticlesBySlugQuery,
    useGetArticlesByCategoryQuery,
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

    commentApi,
    usePostCommentMutation,

    authorApi,
    useGetAuthorByIdQuery,
}