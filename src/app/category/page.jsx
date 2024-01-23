"use client"

import { useSearchParams } from "next/navigation"

import { toFirstLetterUpperCase, data } from "@/helpers"

import { Articles } from "@/components"

import styles from "@/styles/category.module.css"

const Category = () => {
    const searchParams = useSearchParams()
    const searchedParamValue = searchParams.get("category")
    const category = searchedParamValue ? toFirstLetterUpperCase(searchedParamValue) : ""
    const filterData = data.filter(article => article.category.includes(category))

    return (
      <div className={`${styles.category} content-grid`}>
      <div className={`${styles.category_title} spacing-md`}>
        <div></div>
        <h3>{category} </h3>
        <div></div>
      </div>
        <Articles data={filterData} />
      </div>
    )
}

export default Category