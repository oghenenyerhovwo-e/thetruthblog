"use client";
import { Fragment,useState } from 'react'

// components
import Articles from "./Articles"
import ArticlesSearch from "./ArticlesSearch"
import LoadingBox from "./LoadingBox"
import MessageBox from "./MessageBox"

// functions and objects
import { useGetArticlesQuery } from "@/redux"

const AllArticles = () => {
    const [pageIndex, setPageIndex] = useState(1)

    const { isSuccess, isError, data } = useGetArticlesQuery({pageIndex});

    return (
        <Fragment>
            <div className={`spacing-md`}>
                <ArticlesSearch name="articles" />
            </div>
            <Articles 
                articles={data && data.articles}
                pageCount={data && data.pageCount}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
            />
            <LoadingBox display={!isSuccess && !isError} />
            {isSuccess && data.articles && data.articles.length < 1 && <MessageBox message="No article present yet" />}
            {isError && <MessageBox message="Oops! something went wrong with the server" />}
        </Fragment>
    )
}

export default AllArticles
