"use client"
import { Fragment, useEffect, useState } from "react"
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { 
    useGetArticlesBySlugQuery,
    usePostCommentMutation,
} from "@/redux"

import { 
    BsWhatsapp,
    BsFacebook,
    BsTwitter,
    BsLinkedin,
    BsTelegram,
    BsPinterest,
} from "react-icons/bs"

import { MdEmail, MdExpandMore } from "react-icons/md"
import { GrTumblr } from "react-icons/gr"

import { markdownToHTML } from "@/helpers"

import styles from "@/styles/articleslug.module.css"

const ArticlePage = ({params}) => {
    const router = useRouter()

    const initialCommentForm = {
        username: "",
        email: "",
        text: "",
    }
    const [postComment] = usePostCommentMutation()
    const { data } = useGetArticlesBySlugQuery(params.slug)

    const [content, setContent] = useState("")
    const [commentForm, setCommentForm] = useState(initialCommentForm)
    const [displayMoreButtons, setDisplayMoreButtons] = useState(false)

    const article = data && data.data && data.data[0] && data.data[0].attributes
    const articleImage = article && article.image && article.image.data && article.image.data.attributes && article.image.data.attributes.url
    const shareContent = "Great work"
    const pageUrl = window.location.href

    useEffect(() => {
        async function setMarkdownContent (){
            const articleAttribute = data.data[0].attributes
            const articleContent = articleAttribute && await markdownToHTML(articleAttribute.content)
            setContent(articleContent)
        }
        data && data.data && data.data[0] && setMarkdownContent()
    }, [data])

    const handleCommentFormChange = e => {
        const {name, value}  = e.target
        setCommentForm(prevForm => {
            return {
                ...prevForm,
                [name]: value,  
            }
        })
    }

    const submitComment = e => {
        e.preventDefault()
        const body = {
            data: {
                ...commentForm,
                Article: data && data.data && data.data[0] && data.data[0].id,
            }
        }
        postComment(body)
            .unwrap()
            .then(() => setCommentForm(initialCommentForm))
            .catch(error => console.log(error))
    }

    const toggleDisplayMoreButtons = () => setDisplayMoreButtons(prevToggle => !prevToggle)
    const shareFacebook = () => {
        const facebookLink = "/djdj"
        router.push(facebookLink)
    }
    return (
        <>
            {
                article && (
                    <div className={`content-grid ${styles.show_article_wrapper}`}>
                        <div className={`${styles.show_article}`}>
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
                                <div className={`${styles.show_article_share_btn}`}>
                                    <button className={`${styles.whatsapp_btn}`}>
                                        <BsWhatsapp />
                                        <span>Whatsapp</span>
                                    </button>
                                    <button className={`${styles.facebook_btn}`}>
                                        <BsFacebook />
                                        <span>Facebook</span>
                                    </button>
                                    <button className={`${styles.twitter_btn}`}>
                                        <BsTwitter />
                                        <span>Twitter</span>
                                    </button>
                                    <div className={`${styles.show_article_share_btn_more}`}>
                                        <button onClick={toggleDisplayMoreButtons} className={`${styles.more_btn}`}>
                                            <span>More</span>
                                            <MdExpandMore />
                                        </button>
                                        <AnimatePresence mode="wait">
                                            {
                                                displayMoreButtons && (
                                                    <motion.div
                                                        initial={{ opacity: 0, top: "100%", }}
                                                        animate={{ opacity: 1, top: "0%", }}
                                                        exit={{ opacity: 0, top: "100%", }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <button className={`${styles.linkedin_btn}`}>
                                                            <BsLinkedin />
                                                            <span>Linkedin</span>
                                                        </button>
                                                        <button className={`${styles.telegram_btn}`}>
                                                            <BsTelegram />
                                                            <span>Telegram</span>
                                                        </button>
                                                        <button className={`${styles.tumblr_btn}`}>
                                                            <GrTumblr />
                                                            <span>Tumblr</span>
                                                        </button>
                                                        <button className={`${styles.pinterest_btn}`}>
                                                            <BsPinterest />
                                                            <span>Pinterest</span>
                                                        </button>
                                                        <button className={`${styles.email_btn}`}>
                                                            <MdEmail />
                                                            <span>Email</span>
                                                        </button>
                                                    </motion.div>
                                                )
                                            }
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {
                            article.comments && article.comments.data && (
                                <div className={``}>
                                    {
                                        article.comments.data.length > 0 ? article.comments.data.map(comment => {
                                            <Fragment key={comment.id}>
                                                {comment.text}
                                            </Fragment>
                                        }) : (
                                            <div>

                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                        <form onSubmit={submitComment}>
                            <input 
                                placeholder="username"
                                type="text"
                                name="username"
                                value={commentForm.username}
                                onChange={handleCommentFormChange}
                            />
                            <input 
                                placeholder="email"
                                type="email"
                                name="email"
                                value={commentForm.email}
                                onChange={handleCommentFormChange}
                            />
                            <textarea 
                                placeholder="text"
                                name="text"
                                value={commentForm.text}
                                onChange={handleCommentFormChange}
                            />
                            <button type="submit">Post comment</button>
                        </form>
                    </div>
                )
            }
        </>
    )
}

export default ArticlePage
