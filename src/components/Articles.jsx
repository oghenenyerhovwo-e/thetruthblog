import { Fragment } from "react"

import ArticleCard from "./ArticleCard"

import styles from "@/styles/articles.module.css"

const Articles = props => {
    const { data } = props
    return (
        <div className={`${styles.articles}`}>
            {
                data && data.length > 0 && data.map(article => {
                    return (
                        <Fragment key={article._id}>
                            <ArticleCard article={article} />
                        </Fragment>
                    )
                })
            }
        </div>
    )
}

export default Articles