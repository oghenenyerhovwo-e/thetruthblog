"use client"
import { useRouter } from "next/navigation"

// components
import Image from 'next/image'
import Link from 'next/link'
import AuthorPicture from "./AuthorPicture"

// functions
import { getTimeAgo } from "@/helpers"

// css
import styles from "@/styles/articlecard.module.css"

const ArticleCard = props => {
    const { article } = props
    const router = useRouter()

    const gotoArticle = () => router.push(`/articles/${article.slug}`)
    const articleThumbnail = article.image
    const author = article.author
    const authorId = article.author && article.author._id

    return (
        <div className={`${styles.article_card}`}>
            <Image
                src={articleThumbnail}
                alt={`An image of ${article.headline}`}
                width={100}
                height={80}
                onClick={gotoArticle}
            />
            <div className={`${styles.article_card_body}`}>
                <h4 className="spacing-sm">{article.category[0]} </h4>
                <h2 onClick={gotoArticle} className="spacing-sm">{article.title} </h2>
                <p onClick={gotoArticle}>{article.headline} </p>
            </div>
            <div className={`${styles.article_card_footer} spacing-sm`}>
                <div className={`${styles.article_card_footer_author}`}>
                    <AuthorPicture author={author} />
                    <p>
                        by {" "}
                        <Link href={{pathname: `/articles/author/${authorId}`, query: {authorName: author.fullName}}}>{author.fullName} </Link>
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