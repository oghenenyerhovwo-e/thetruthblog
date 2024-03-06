"use client"

import Image from 'next/image'
import Link from 'next/link'

import AuthorPicture from "./AuthorPicture"
import { useRouter } from "next/navigation"

import styles from "@/styles/articlecard.module.css"

import { getTimeAgo } from "@/helpers"

const ArticleCard = props => {
    const { article } = props
    const router = useRouter()

    const gotoArticle = () => router.push(`/article/${article.slug}`)
    const articleThumbnail = article.image && article.image.data && article.image.data.attributes && article.image.data.attributes.formats && article.image.data.attributes.formats.thumbnail && article.image.data.attributes.formats.thumbnail.url
    const author = article.author && article.author.data && article.author.data.attributes
    const authorId = article.author && article.author.data && article.author.data.id

    return (
        <div className={`${styles.article_card}`}>
            <Image
                src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + articleThumbnail}
                alt={`An image of ${article.seoMetaDescription}`}
                width={100}
                height={80}
                onClick={gotoArticle}
            />
            <div className={`${styles.article_card_body}`}>
                <h4 className="spacing-sm">{article.category} </h4>
                <h2 onClick={gotoArticle} className="spacing-sm">{article.title} </h2>
                <p onClick={gotoArticle}>{article.headline} </p>
            </div>
            <div className={`${styles.article_card_footer} spacing-sm`}>
                <div className={`${styles.article_card_footer_author}`}>
                    <AuthorPicture authorId={authorId} />
                    <p>
                        by {" "}
                        <Link href={{pathname: `/article/author/${authorId}`, query: {author: author.fullName}}}>{author.fullName} </Link>
                    </p>
                </div>
                <p className={`${styles.article_card_footer_date}date`}>
                    {getTimeAgo(article.createdAt)}
                </p>
            </div>
        </div>
    )
}

export default ArticleCard