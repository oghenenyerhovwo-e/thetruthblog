"use client"
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// components
import { FaTrash } from "react-icons/fa6";
import Spinner from "./Spinner"
import Alert from "./Alert"
import Image from "next/image"
import Link from 'next/link'

// functions and objects
import { useDeleteCommentMutation } from "@/redux"
import { getTimeAgo } from "@/helpers"

// images
import { userImg } from "@/assets"

// css
import styles from "@/styles/commentcard.module.css"

const CommentCard = (props) => {
    const { comment, currentUser, articleId, setDeletedComment, } = props

    const deleteCommentMenuRef = useRef(null);

    const [deleteComment, { isLoading, error, isError }] = useDeleteCommentMutation()

    const [displayDeleteCommentMenu, setDisplayDeleteCommentMenu] = useState(false)

    useEffect(() => {
        const handleMenuWhenClickOutside = (event) => {
          // Close the navbar if it's open and the click is outside the navbar
          if (displayDeleteCommentMenu && deleteCommentMenuRef.current && !deleteCommentMenuRef.current.contains(event.target)) {
            setDisplayDeleteCommentMenu(false);
          }
        };
    
        // Add event listener to handle clicks outside the navbar
        document.addEventListener('click', handleMenuWhenClickOutside);
    
        // Clean up the event listener on component unmount
        return () => {
          document.removeEventListener('click', handleMenuWhenClickOutside);
        };
    }, [displayDeleteCommentMenu]);

    const toggleMenu = () => setDisplayDeleteCommentMenu(prevToggle => !prevToggle)
    const closeMenu = () => setDisplayDeleteCommentMenu(false)

    const handleDelete = () => {
        // e.stopPropagation()
        deleteComment({articleId, id: comment._id})
            .unwrap()
            .then((res) => {
                setDisplayDeleteCommentMenu(false)
                setDeletedComment(res.commentId)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={`${styles.comment_card}`}>
            <div className={`spacing-sm ${styles.comment_card_head}`}>
                <div>
                    <Image
                        src={userImg}
                        alt="user image"
                        width={20}
                        height={20}
                    />
                    <h4>{comment.fullName} </h4>
                </div>
                <h6>{getTimeAgo(comment.createdAt)} </h6>
            </div>
            <p>{comment.text} </p> 
            <div className={`${styles.comment_card_delete}`}>
                {
                    (currentUser.isAdmin) && (
                        <>
                            <Link onClick={toggleMenu} className={`${styles.delete}`} href="#"><FaTrash /> </Link>
                        </>
                    )
                }
                <AnimatePresence mode="wait">
                    {
                        displayDeleteCommentMenu && (
                            <motion.div
                                key="delete_menu_bar"
                                className={`${styles.delete_menu_overlay}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    ref={deleteCommentMenuRef}
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
            </div>
        </div>
    )
}

export default CommentCard