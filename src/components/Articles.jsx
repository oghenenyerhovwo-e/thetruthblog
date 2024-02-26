import { Fragment } from "react"

import ArticleCard from "./ArticleCard"
import { GrFormPrevious, GrFormNext } from "react-icons/gr"

import styles from "@/styles/articles.module.css"

const Articles = (props) => {  
    const {
        data,
        setPageIndex,
    } = props

    const nextPage = () => setPageIndex(prevPageIndex => prevPageIndex + 1)
    const previousPage = () => setPageIndex(prevPageIndex => prevPageIndex - 1)

    return (
        <div>
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
            <div className={`${styles.articles_page_button} spacing-md`}>
                {
                    data && data.meta && data.meta.pagination.page > 1 && (
                        <div className={`${styles.articles_page_button_previous}`}>
                            <button 
                                onClick={previousPage}
                            >
                                <GrFormPrevious />
                                <span>Previous</span>
                            </button>
                        </div>
                    )
                }
                {
                    data && data.meta && data.meta.pagination.pageCount > data.meta.pagination.page && (
                        <div className={`${styles.articles_page_button_next}`}>
                            <button 
                                onClick={nextPage}
                            >
                                <span>Next</span>
                                <GrFormNext />
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Articles