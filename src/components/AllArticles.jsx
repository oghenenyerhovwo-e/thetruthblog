"use client";
import { Fragment,useState } from 'react'

import { useGetArticlesQuery } from "@/redux"

import Articles from "./Articles"

const AllArticles = () => {
    const [pageIndex, setPageIndex] = useState(1)

    const { isLoading, isFetching, data, error } = useGetArticlesQuery(pageIndex);

    return (
        <Fragment>
            <Articles 
                data={data}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
            />
        </Fragment>
    )
}

export default AllArticles
