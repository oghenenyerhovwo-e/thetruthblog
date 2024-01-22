import Image from 'next/image'

import styles from "@/styles/articlecard.module.css"

import { authorImg } from "@/assets"
import { getTimeAgo } from "@/helpers"

const ArticleCard = props => {
    const { article } = props
    return (
        <div className={`${styles.article_card}`}>
            <Image
                src={article.image}
                alt={`An image describing ${article.seoMetaData && article.seoMetaData.metaTitle}`}
            />
            <div className={`${styles.article_card_body}`}>
                <h4 className="spacing-sm">{article.category[0]} </h4>
                <h2 className="spacing-sm">{article.title} </h2>
                <p>{article.headline} </p>
            </div>
            <div className={`${styles.article_card_footer} spacing-sm`}>
                <div className={`${styles.article_card_footer_author}`}>
                    <Image
                        src={authorImg}
                        alt="an image of the author"
                    />
                    <p>by Clifford Ndujihe JNR.</p>
                </div>
                <p className={`${styles.article_card_footer_date}date`}>
                    {getTimeAgo(article.datePublished)}
                </p>
            </div>
        </div>
    )
}

export default ArticleCard