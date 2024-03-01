import { Fragment } from "react"
import CommentCard from "./CommentCard"

import { FaRegComment } from "react-icons/fa6"

import styles from "@/styles/comments.module.css"

const Comments = (props)=> {
    const { comments } = props
    console.log(comments)

    const sortedComments = comments.length > 1 ? comments.slice().sort((a,b) => b.attributes.createdAt.getTime() - a.attributes.createdAt.getTime()) : comments.length > 0 ? comments: []

    return (
        <div className={`${styles.comments}`}>
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