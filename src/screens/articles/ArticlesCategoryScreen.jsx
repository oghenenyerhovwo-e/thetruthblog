"use client"
import { useState } from 'react'
import { useSearchParams } from "next/navigation"

// component
import { Articles, LoadingBox, MessageBox, ArticlesSearch } from "@/components"

// functions and objects
import { useGetArticlesByCategoryQuery } from "@/redux"
import { toFirstLetterUpperCase } from "@/helpers"

// css
import styles from "@/styles/category.module.css"

const ArticlesCategoryScreen = () => {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("pageNumber")
    const searchedCategory = searchParams.get("category")

    const category = searchedCategory ? toFirstLetterUpperCase(searchedCategory) : ""
    const [pageIndex, setPageIndex] = useState(pageNumber || 1)
    const { isSuccess, isError, data } = useGetArticlesByCategoryQuery({pageIndex,category});
    const pathQuery = `?category=${searchedCategory}&`

    return (
      <div className={`${styles.category} content-grid`}>
        <LoadingBox display={!isSuccess && !isError} />
        {isSuccess && data.articles && data.articles.length < 1 && <MessageBox message="No article present under this category yet" />}
        {isError && <MessageBox message="Oops! something went wrong with the server" />}
        <div className={`${styles.category_title} spacing-md`}>
          <div></div>
          <h3>{category} </h3>
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

export default ArticlesCategoryScreen