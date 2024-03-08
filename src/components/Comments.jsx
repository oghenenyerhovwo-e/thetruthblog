"use client"
import { useRef, useEffect } from "react"

import { Fragment } from "react"
import CommentCard from "./CommentCard"

import { FaRegComment } from "react-icons/fa6"

import styles from "@/styles/comments.module.css"

const Comments = (props)=> {
    const { comments } = props

    const commentsRef = useRef(null)

    const sortedComments = comments.length > 1 ? comments.slice().sort((a,b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)) : comments.length > 0 ? comments: []

    useEffect(() => {
      if(commentsRef.current){
        commentsRef.current.scrollIntoView({behaviour: "smooth", block: "start", inline: "start", top: "-2rem"})
      }
    }, [])
    
    return (
        <div className={`${styles.comments}`}>
            <div className={`${styles.scroll_position}`} ref={commentsRef}></div>
            {
                sortedComments.length > 0 ? sortedComments.map(comment => (
                    <Fragment key={comment.id}>
                        <CommentCard comment={comment.attributes} />
                    </Fragment>
                )) : (
                    <div className={`${styles.comments_none}`}>
                        <h4>
                            <span>No comment</span>
                            <FaRegComment />
                        </h4>
                        <p>Be the first to drop a comment</p>
                    </div>
                )
            }
        </div>
    )
}

export default Comments