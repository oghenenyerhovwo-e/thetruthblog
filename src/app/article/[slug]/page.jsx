"use client"
import { Fragment, useEffect, useState, useRef } from "react"
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion';

// components
import { ShareButtons, Comments, CommentForm, LoadingBox, MessageBox } from "@/components"
import Image from 'next/image'

// functions
import { 
    useGetArticlesBySlugQuery,
} from "@/redux"
import { markdownToHTML } from "@/helpers"

// styles
import styles from "@/styles/articleslug.module.css"

const ArticlePage = ({params}) => {
    const router = useRouter()

    const { data, isSuccess, isError } = useGetArticlesBySlugQuery(params.slug)

    const commentSectionRef = useRef(null);   

    const [content, setContent] = useState("")
    const [comments, setComments] = useState()
    const [displayCommentSection, setDisplayCommentSection] = useState(false)
    const [commentSectionContent, setCommentSectionContent] = useState("comments")

    const article = data && data.data && data.data[0] && data.data[0].attributes
    const articleImage = article && article.image && article.image.data && article.image.data.attributes && article.image.data.attributes.url
    const articleSlug = article && article.slug
    const articleId = data && data.data && data.data[0] && data.data[0].id
    const pageUrl = articleSlug ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/article/${articleSlug}` : `${process.env.NEXT_PUBLIC_FRONTEND_URL}/` 

    useEffect(() => {
        setComments((data && data.data && data.data[0] && data.data[0].attributes && data.data[0].attributes.comments && data.data[0].attributes.comments.data) || [])
    }, [data])

    useEffect(() => {
        async function setMarkdownContent (){
            const articleAttribute = data.data[0].attributes
            const articleContent = articleAttribute && await markdownToHTML(articleAttribute.content)
            setContent(articleContent)
        }
        data && data.data && data.data[0] && setMarkdownContent()
    }, [data])

    useEffect(() => {
        const handleCloseCommentSectionWhenClickOutside = (event) => {
          // Close the navbar if it's open and the click is outside the navbar
          if (displayCommentSection && commentSectionRef.current && !commentSectionRef.current.contains(event.target)) {
            setDisplayCommentSection(false);
          }
        };
    
        // Add event listener to handle clicks outside the navbar
        document.addEventListener('click', handleCloseCommentSectionWhenClickOutside);
    
        // Clean up the event listener on component unmount
        return () => {
          document.removeEventListener('click', handleCloseCommentSectionWhenClickOutside);
        };
      }, [displayCommentSection]);

    const toggleCommentSection = () => setDisplayCommentSection(prevToggle => !prevToggle)
    const showCommentsInCommentSection = () => setCommentSectionContent("comments") 
    const showFormInCommentSection = () => setCommentSectionContent("form") 

    return (
        <>
            <LoadingBox display={!isSuccess && !isError} />
            {data && data.data && data.data.length < 1 && <MessageBox message="No Article was found" />}
            {isError && <MessageBox message="Oops! something went wrong with the server" />}
            {
                article && (
                    <div className={`content-grid ${styles.show_article_wrapper}`}>
                        <div className={`${styles.show_article} spacing-md`}>
                            {
                                articleImage && (
                                    <div className={`${styles.show_article_img} spacing-md`}>
                                        <Image
                                            src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + articleImage}
                                            width={100}
                                            height={100}
                                            alt={`An image of ${article && article.seoMetaDescription}`}
                                        />
                                    </div>
                                ) 
                            }
                            <div className={`${styles.show_article_body} spacing-md`}>
                                <h4 className="spacing-sm">{article.category} </h4>
                                <h2 className="spacing-sm">{article.title} </h2>
                                <div className={`${styles.show_article_body_content}`} dangerouslySetInnerHTML={{__html: content}}></div>
                            </div>
                            <div className={`${styles.show_article_share}`}>
                                <h4>Share this:</h4>
                                <ShareButtons 
                                    url={pageUrl}
                                    title={article.title}
                                    tags={article.tags}
                                    headline={article.headline}
                                    source={article.source}
                                />
                            </div>
                        </div>

                        <div className={`${styles.show_article_comments} spacing-md`}>
                            <button onClick={toggleCommentSection}>
                                View 
                                {" "}
                                {(article.comments && article.comments.data && article.comments.data.length > 0) ? article.comments.data.length : ""}
                                {" "}
                                Comment(s)
                            </button>
                            <AnimatePresence mode="wait">
                                {
                                    displayCommentSection && (
                                        <motion.div
                                            ref={commentSectionRef}
                                            initial={{ y: "100vh", opacity: 0, }}
                                            animate={{ y: "0vh", opacity: 1, }}
                                            exit={{ y: "100vh", opacity: 0, }}
                                            transition={{ duration: 0.5 }}
                                            className={`${styles.show_article_comment_section}`}
                                        >
                                            <div className={`${styles.show_article_comment_section_wrapper} content-grid`}>
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
                                                                <Comments comments={comments} />
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
                                                                    articleSlug={articleSlug}
                                                                    
                                                                />
                                                            </motion.div>
                                                        )
                                                    }
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ArticlePage
