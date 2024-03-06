"use client"
import { useState } from 'react'

import { useGetArticlesByUserQuery } from "@/redux"

import { useSearchParams } from "next/navigation"

import { toFirstLetterUpperCase } from "@/helpers"

import { Articles, LoadingBox, MessageBox } from "@/components"

import styles from "@/styles/authorarticle.module.css"

const AuthorArticle = ({params}) => {
    const searchParams = useSearchParams()
    const searchedParamValue = searchParams.get("author")
    const pageNumber = searchParams.get("pageNumber")

    const authorName = searchedParamValue ? toFirstLetterUpperCase(searchedParamValue) : ""

    const [pageIndex, setPageIndex] = useState(pageNumber || 1)
    const { isSuccess, isError, data } = useGetArticlesByUserQuery({pageIndex, authorId: params.authorId});

    return (
      <div className={`${styles.author_article} content-grid`}>
        <LoadingBox display={!isSuccess && !isError} />
        {isError && <MessageBox message="Oops! something went wrong with the server" />}
        <div className={`${styles.author_article_title} spacing-md`}>
          <div></div>
          <h3>Articles by {authorName} </h3>
          <div></div>
        </div>
        <Articles 
            data={data}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
        />
      </div>
    )
}

export default AuthorArticle