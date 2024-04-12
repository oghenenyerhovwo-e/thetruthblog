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
    const searchedParamValue = searchParams.get("category")
    const category = searchedParamValue ? toFirstLetterUpperCase(searchedParamValue) : ""
    const [pageIndex, setPageIndex] = useState(1)
    const { isSuccess, isError, data } = useGetArticlesByCategoryQuery({pageIndex,category});

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
        />
      </div>
    )
}

export default ArticlesCategoryScreen