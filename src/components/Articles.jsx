import { Fragment } from "react"

import { usePathname } from 'next/navigation'

import ArticleCard from "./ArticleCard"
import MessageBox from "./MessageBox"
import Pagination from "./Pagination"

import styles from "@/styles/articles.module.css"

const Articles = (props) => {  
    const {
        data,
        setPageIndex,
        pageIndex,
    } = props

    const pathname = usePathname()

    const controlPathname = pathname.includes("?") ? `${pathname}&` : `${pathname}?`

    return (
        <div>
            {data && data.data && data.data.length < 1 && <MessageBox message="No Article was found" />}
            <div className={`${styles.articles} spacing-md`}>
                {
                    data && data.data && data.data.length > 0 && data.data.map(article => {
                        return (
                            <Fragment key={article.id}>
                                <ArticleCard article={article.attributes} />
                            </Fragment>
                        )
                    })
                }
            </div>
            <div className={`${styles.articles_page_pagination} spacing-md`}>
                {
                    data && data.meta && data.meta.pagination && (
                        <Pagination
                            pagination={data.meta.pagination}
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            controlPathname={controlPathname}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Articles