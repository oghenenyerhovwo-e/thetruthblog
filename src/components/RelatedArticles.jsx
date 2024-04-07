"use client";
import { Fragment,useState } from 'react'

import { useGetRelatedArticlesBySlugQuery } from "@/redux"

import Articles from "./Articles"
import LoadingBox from "./LoadingBox"

const RelatedArticles = (props) => {
    const { slug } = props
    const { isSuccess, isError, data } = useGetRelatedArticlesBySlugQuery({slug});

    return (
        <Fragment>
            <Articles 
                articles={data && data.articles}
                hidePagination={true}
            />
            <LoadingBox display={!isSuccess && !isError} />
        </Fragment>
    )
}

export default RelatedArticles
