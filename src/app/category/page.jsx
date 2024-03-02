"use client"
import { useState } from 'react'

import { useGetArticlesByCategoryQuery } from "@/redux"

import { useSearchParams } from "next/navigation"

import { toFirstLetterUpperCase } from "@/helpers"

import { Articles, LoadingBox, MessageBox } from "@/components"

import styles from "@/styles/category.module.css"

const Category = () => {
    const searchParams = useSearchParams()
    const searchedParamValue = searchParams.get("category")
    const category = searchedParamValue ? toFirstLetterUpperCase(searchedParamValue) : ""
    const [pageIndex, setPageIndex] = useState(1)
    const { isSuccess, isError, data } = useGetArticlesByCategoryQuery({pageIndex,category});

    return (
      <div className={`${styles.category} content-grid`}>
        <LoadingBox display={!isSuccess && !isError} />
        {isError && <MessageBox message="Oops! something went wrong with the server" />}
        <div className={`${styles.category_title} spacing-md`}>
          <div></div>
          <h3>{category} </h3>
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

export default Category