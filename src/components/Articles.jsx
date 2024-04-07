import { Fragment } from "react"

import { usePathname } from 'next/navigation'

import ArticleCard from "./ArticleCard"
import Pagination from "./Pagination"

import styles from "@/styles/articles.module.css"

const Articles = (props) => {  
    const {
        articles,
        setPageIndex,
        pageIndex,
        pageCount,
        disablePaginationQuery,
        hidePagination,
    } = props

    const pathname = usePathname()

    const controlPathname = pathname.includes("?") ? `${pathname}&` : `${pathname}?`

    return (
        <div>
            <div className={`${styles.articles} spacing-md`}>
                {
                    articles && articles.length > 0 && articles.map(article => {
                        return (
                            <Fragment key={article._id}>
                                <ArticleCard article={article} />
                            </Fragment>
                        )
                    })
                }
            </div>
            {
                !hidePagination && (
                    <div className={`${styles.articles_page_pagination} spacing-md`}>
                        {
                            pageCount && (
                                <Pagination
                                    pageCount={pageCount}
                                    pageIndex={pageIndex}
                                    setPageIndex={setPageIndex}
                                    controlPathname={controlPathname}
                                    disablePaginationQuery={disablePaginationQuery}
                                />
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Articles