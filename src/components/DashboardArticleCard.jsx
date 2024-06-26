"use client"
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation"

// components
import Image from 'next/image'
import Link from 'next/link'
import { FaTrash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import Spinner from "./Spinner"
import Alert from "./Alert"

// functions and objects
import { useDeleteArticleMutation } from "@/redux"

// css
import styles from "@/styles/dashboardarticlecard.module.css"

const DashboardArticleCard = props => {
    const { article, currentUser, setDeletedArticle } = props

    const router = useRouter()
    const deleteMenuRef = useRef(null);

    const [deleteArticle, { isLoading, error, isError }] = useDeleteArticleMutation()
    const [displayDeleteMenu, setDisplayDeleteMenu] = useState(false)

    const gotoArticle = () => router.push(`/articles/${article.slug}`)
    const articleThumbnail = article.image

    useEffect(() => {
        const handleMenuWhenClickOutside = (event) => {
          // Close the navbar if it's open and the click is outside the navbar
          if(displayDeleteMenu && deleteMenuRef.current && !deleteMenuRef.current.contains(event.target)) {
            setDisplayDeleteMenu(false);
          }
        };
    
        // Add event listener to handle clicks outside the navbar
        document.body.addEventListener('click', handleMenuWhenClickOutside);
    
        // Clean up the event listener on component unmount
        return () => {
          document.body.removeEventListener('click', handleMenuWhenClickOutside);
        };
    }, [displayDeleteMenu]);

    const toggleMenu = () => setDisplayDeleteMenu(prevToggle => !prevToggle)
    const closeMenu = () => setDisplayDeleteMenu(false)

    const handleDelete = e => {
        // e.stopPropagation()
        deleteArticle({slug: article.slug})
            .unwrap()
            .then((res) => {
                setDisplayDeleteMenu(false)
                setDeletedArticle(res.articleSlug)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className={`${styles.dashboard_article_card}`}>
                <div className={`${styles.dashboard_article_card_img}`}>
                    <Image
                        src={articleThumbnail}
                        alt={`An image of ${article.headline}`}
                        width={20}
                        height={20}
                        onClick={gotoArticle}
                    />
                </div>
                <div className={`${styles.dashboard_article_card_title}`}>
                    <h4>
                        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                    </h4>
                </div>
                <div className={`${styles.dashboard_article_card_category}`}>
                    <p>{article.category[0]} </p>
                </div>
                <div className={`${styles.dashboard_article_card_icons}`}>
                    {
                        (currentUser.isAdmin || String(currentUser._id) === String(article.author && article.author._id) ) && (
                            <>
                                <Link className={`${styles.edit}`} href={`/articles/${article.slug}/edit`}><CiEdit /> </Link>
                                <Link onClick={toggleMenu} className={`${styles.delete}`} href="#"><FaTrash /> </Link>
                            </>
                        )
                    }
                </div>
            </div>

            <AnimatePresence mode="wait">
                {
                    displayDeleteMenu && (
                        <motion.div
                            key="delete_menu_bar"
                            className={`${styles.delete_menu_overlay}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                ref={deleteMenuRef}
                                initial={{ y: "-100vh", opacity: 0, }}
                                animate={{ y: "0vh", opacity: 1, }}
                                exit={{ y: "-100vh", opacity: 0, }}
                                transition={{ duration: 0.5 }}
                                className={`${styles.delete_menu}`}
                            >
                                <h4 className="spacing-sm"> Are you sure you want to delete this article permanently</h4>
                                {
                                    (isError && error && error.data && error.data.error) &&  (
                                        <div className={`spacing-sm`}>
                                            <Alert 
                                                message={error && error.data && error.data.error} 
                                                variant="danger" 
                                            />
                                        </div>
                                    )
                                }
                                <div className={`${styles.delete_menu_buttons}`}>
                                    <button className={`${styles.cancel}`} onClick={closeMenu}>cancel</button>
                                    {
                                        !isLoading ? (
                                            <button className={`${styles.delete}`} onClick={handleDelete}>Delete</button>
                                        ) : (
                                            <div className={`${styles.form_screen_spinner}`}>
                                                <Spinner />
                                            </div>
                                        )
                                    }
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default DashboardArticleCard