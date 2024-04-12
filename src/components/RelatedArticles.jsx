"use client";
import { Fragment,useState } from 'react'

import { useGetRelatedArticlesBySlugQuery } from "@/redux"

import Articles from "./Articles"
import LoadingBox from "./LoadingBox"

import styles from "@/styles/relatedarticle.module.css"

const RelatedArticles = (props) => {
    const { slug } = props
    const { isSuccess, isError, data } = useGetRelatedArticlesBySlugQuery({slug});

    return (
        <Fragment>
            {
                data && data.articles && data.articles.length > 0 && (
                    <div className={`${styles.article_related}`}>
                        <div className={`${styles.article_related_heading} spacing-md`}>
                            <div></div>
                            <h3>Related</h3>
                            <div></div>
                        </div>
                        <Articles 
                            articles={data && data.articles}
                            hidePagination={true}
                        />
                        <LoadingBox display={!isSuccess && !isError} />
                    </div>
                )
            }
        </Fragment>
    )
}

export default RelatedArticles
