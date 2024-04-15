"use client"
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion';
import moment from "moment"

// components
import { 
    ShareButtons, 
    Comments, 
    CommentForm, 
    LoadingBox,
    MessageBox,
    Popup,
    RelatedArticles,
} from "@/components"
import Image from 'next/image'

// functions
import { 
    useGetArticleBySlugQuery,
    useAppSelector,
} from "@/redux"
import { markdownToHTML } from "@/helpers"

// styles
import styles from "@/styles/articleslug.module.css"

const ArticleSlugScreen = (props) => {
    const { params } = props
    const pathname = usePathname()

    const { currentUser } = useAppSelector(state => state.userStore)

    const [content, setContent] = useState("")
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState({})
    const [deletedComment, setDeletedComment] = useState("")
    const [displayCommentSection, setDisplayCommentSection] = useState(false)
    const [commentSectionContent, setCommentSectionContent] = useState("comments")

    const { data, isSuccess, isError } = useGetArticleBySlugQuery({slug: params.slug, newComment, deletedComment})

    const article = data && data.article
    const articleImage = article && article.image
    const articleId = article && article._id
    const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}` 

    useEffect(() => {
        setComments((article && article.comments) || [])
    }, [article])

    useEffect(() => {
        async function setMarkdownContent (){
            const articleContent = article && await markdownToHTML(article.content)
            setContent(articleContent)
        }
        article && setMarkdownContent()
    }, [article])

    const toggleCommentSection = () => setDisplayCommentSection(prevToggle => !prevToggle)
    const showCommentsInCommentSection = () => setCommentSectionContent("comments") 
    const showFormInCommentSection = () => setCommentSectionContent("form") 

    return (
        <>
            <LoadingBox display={!isSuccess && !isError} />
            {isSuccess && !article && <MessageBox message="No Article was found" />}
            {isError && <MessageBox message="Oops! something went wrong with the server" />}
            {
                article && article._id && (
                    <div className={`content-grid ${styles.show_article_wrapper}`}>
                        <div className={`${styles.show_article} spacing-md`}>
                            {
                                articleImage && (
                                    <div className={`${styles.show_article_img} spacing-md`}>
                                        <Image
                                            src={articleImage}
                                            width={400}
                                            height={400}
                                            alt={`image - ${article && article.headline}`}
                                        />
                                    </div>
                                ) 
                            }
                            <div className={`${styles.show_article_body} spacing-md`}>
                                <h4 className="spacing-sm">{article.category[0]} </h4>
                                <h2 className="spacing-sm">{article.title} </h2>
                                <div className={`${styles.show_article_body_content}`} dangerouslySetInnerHTML={{__html: content}}></div>
                            </div>
                            <div className={`${styles.show_article_share} spacing-md`}>
                                <h4>Share this:</h4>
                                <ShareButtons 
                                    url={pageUrl}
                                    title={article.title}
                                    tags={article.tags}
                                    headline={article.headline}
                                    source={article.source}
                                />
                            </div>
                            <div className={`${styles.show_article_other_details}`}>
                                <div className={`${styles.show_article_other_details_author} spacing-sm`}>
                                    <p>Created by {article.author && article.author.fullName} on {moment(article.createdAt).format("MMMM Do YYYY")}  </p>
                                </div>
                                {
                                    article.source && (
                                        <div className={`${styles.show_article_other_details_source} spacing-sm`}>
                                            <p>Sources: {article.source}  </p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className={`${styles.show_article_comments} spacing-md`}>
                            <button onClick={toggleCommentSection}>
                                View 
                                {" "}
                                {(article.comments && article.comments.length > 0) ? article.comments.length : ""}
                                {" "}
                                Comment(s)
                            </button>
                            <Popup display={displayCommentSection} setDisplay={setDisplayCommentSection}>
                                <div className={`${styles.show_article_comment_section} content-grid`}>
                                    <AnimatePresence mode="wait">
                                        {
                                            commentSectionContent === "comments" && (
                                                <motion.div
                                                    initial={{ x: "100vw", opacity: 0, }}
                                                    animate={{ x: "0vw", opacity: 1, }}
                                                    exit={{ x: "100vw", opacity: 0, }}
                                                    transition={{ duration: 0.5 }}
                                                    className={`${styles.show_article_comment_section_comments}`}
                                                >
                                                    <button className="spacing-md" onClick={showFormInCommentSection}>Add Comment</button>
                                                    <Comments 
                                                        articleId={articleId}  
                                                        currentUser={currentUser} 
                                                        comments={comments}
                                                        setDeletedComment={setDeletedComment}
                                                    />
                                                </motion.div>
                                            )
                                        }
                                    </AnimatePresence>
                                    <AnimatePresence mode="wait">
                                        {
                                            commentSectionContent === "form" && (
                                                <motion.div
                                                    initial={{ x: "100vw", opacity: 0, }}
                                                    animate={{ x: "0vw", opacity: 1, }}
                                                    exit={{ x: "100vw", opacity: 0, }}
                                                    transition={{ duration: 0.5 }}
                                                    className={`${styles.show_article_comment_section_form}`}
                                                >
                                                    <button className="spacing-md" onClick={showCommentsInCommentSection}>View Comments</button>
                                                    <CommentForm 
                                                        articleId={articleId} 
                                                        setCommentSectionContent={setCommentSectionContent}
                                                        setNewComment={setNewComment}
                                                    />
                                                </motion.div>
                                            )
                                        }
                                    </AnimatePresence>
                                </div>
                            </Popup>
                        </div>

                        <RelatedArticles 
                            slug={article.slug}
                        />
                    </div>
                )
            }
        </>
    )
}

export default ArticleSlugScreen
