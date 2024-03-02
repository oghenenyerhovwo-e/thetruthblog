"use client"

import Image from 'next/image'
import { useRouter } from "next/navigation"

import styles from "@/styles/articlecard.module.css"

import { authorImg } from "@/assets"
import { getTimeAgo } from "@/helpers"

const ArticleCard = props => {
    const { article } = props
    const router = useRouter()

    const gotoArticle = () => router.push(`/article/${article.slug}`)
    const articleThumbnail = article.image && article.image.data && article.image.data.attributes && article.image.data.attributes.formats && article.image.data.attributes.formats.thumbnail && article.image.data.attributes.formats.thumbnail.url
    const author = article.author && article.author.data && article.author.data.attributes
    console.log(article);
    return (
        <div onClick={gotoArticle} className={`${styles.article_card}`}>
            <Image
                src={articleThumbnail}
                alt={`An image of ${article.seoMetaDescription}`}
                width={100}
                height={80}
            />
            <div className={`${styles.article_card_body}`}>
                <h4 className="spacing-sm">{article.category} </h4>
                <h2 className="spacing-sm">{article.title} </h2>
                <p>{article.headline} </p>
            </div>
            <div className={`${styles.article_card_footer} spacing-sm`}>
                <div className={`${styles.article_card_footer_author}`}>
                    <Image
                        src={authorImg}
                        alt={`profile picture of ${author.fullName}`}
                    />
                    <p>by {author.fullName}</p>
                </div>
                <p className={`${styles.article_card_footer_date}date`}>
                    {getTimeAgo(article.createdAt)}
                </p>
            </div>
        </div>
    )
}

export default ArticleCard