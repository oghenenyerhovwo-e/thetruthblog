"use client"
import { useState } from 'react'
import { useSearchParams } from "next/navigation"

// components
import { Articles, LoadingBox, MessageBox, ArticlesSearch } from "@/components"

// functions and objects
import { useGetArticlesByAuthorQuery } from "@/redux"

// css
import styles from "@/styles/authorarticle.module.css"

const ArticlesAuthorScreen = ({params}) => {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("pageNumber")
    const authorName = searchParams.get("authorName")

    const [pageIndex, setPageIndex] = useState(pageNumber || 1)
    const { isSuccess, isError, data } = useGetArticlesByAuthorQuery({authorId: params.authorId, pageIndex});
    const pathQuery = `?authorName=${authorName}&`

    return (
      <div className={`${styles.author_article} content-grid`}>
        <LoadingBox display={!isSuccess && !isError} />
        {isSuccess && data && data.articles && data.articles.length < 1 && <MessageBox message="No article present under this author yet" />}
        {isError && <MessageBox message="Oops! something went wrong with the server" />}
        <div className={`${styles.author_article_title} spacing-md`}>
          <div></div>
          <h3>Articles by {authorName} </h3>
          <div></div>
        </div>
        <div className={`spacing-md`}>
            <ArticlesSearch />
        </div>
        <Articles 
            articles={data && data.articles}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageCount={data && data.pageCount}
            pathQuery={pathQuery}
        />
      </div>
    )
}

export default ArticlesAuthorScreen