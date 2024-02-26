import {
    useAppDispatch,
    useAppSelector,
    useAppStore,
} from "./hooks.js"

import {
    makeStore,
} from "./store.js"

import {
    useGetArticlesQuery,
    useGetArticlesBySlugQuery,
    useGetArticlesByCategoryQuery,

    usePostCommentMutation,
} from "./services"

export {
    makeStore,
    useAppDispatch,
    useAppSelector,
    useAppStore,

    useGetArticlesQuery,
    useGetArticlesBySlugQuery,
    useGetArticlesByCategoryQuery,
    usePostCommentMutation,
}