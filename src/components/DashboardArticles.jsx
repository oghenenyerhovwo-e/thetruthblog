import { Fragment } from "react"

import { usePathname } from 'next/navigation'

import DashboardArticleCard from "./DashboardArticleCard"
import Pagination from "./Pagination"
import ArticlesSearch from "./ArticlesSearch"

const DashboardArticles = (props) => {  
    const {
        articles,
        setPageIndex,
        pageIndex,
        pageCount,
        currentUser,
        disablePaginationQuery,
    } = props

    const pathname = usePathname()

    const controlPathname = pathname.includes("?") ? `${pathname}&` : `${pathname}?`

    return (
        <div>
            <div className={`spacing-md`}>
                <div className={`spacing-sm`}>
                    <ArticlesSearch name="dashboardArticles" />
                </div>
                {
                    articles && articles.length > 0 && articles.map(article => {
                        return (
                            <Fragment key={article._id}>
                                <DashboardArticleCard article={article} currentUser={currentUser} />
                            </Fragment>
                        )
                    })
                }
            </div>
            <div className={`${styles.articles_page_pagination} spacing-md`}>
                {
                    pageCount && (
                        <Pagination
                            pageCount={pageCount}
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            currentUser={currentUser}
                            controlPathname={controlPathname}
                            disablePaginationQuery={disablePaginationQuery}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default DashboardArticles