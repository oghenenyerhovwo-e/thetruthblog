"use client";
import { Fragment,useState } from 'react'
import { useSearchParams } from "next/navigation"
import { useGetArticlesQuery } from "@/redux"

import Articles from "./Articles"
import LoadingBox from "./LoadingBox"
import MessageBox from "./MessageBox"

const AllArticles = () => {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("pageNumber")

    const [pageIndex, setPageIndex] = useState(pageNumber || 1)

    const { isSuccess, isError, data } = useGetArticlesQuery(pageIndex);

    return (
        <Fragment>
            <Articles 
                data={data}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
            />
            <LoadingBox display={!isSuccess && !isError} />
            {isError && <MessageBox message="Oops! something went wrong with the server" />}
        </Fragment>
    )
}

export default AllArticles
