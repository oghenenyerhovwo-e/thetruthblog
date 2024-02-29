import CommentCard from "./CommentCard"

import { FaRegComment } from "react-icons/fa6"

import styles from "@/styles/comments.module.css"

const Comments = (props)=> {
    const { comments } = props

    return (
        <div className={`${styles.comments}`}>
            {
                comments > 0 ? comments.map(comment => {
                    <Fragment key={comment.id}>
                        <CommentCard comment={comment.attributes} />
                    </Fragment>
                }) : (
                    <div className={`${styles.comments_none}`}>
                        <span>No comment</span>
                        <FaRegComment />
                    </div>
                )
            }
        </div>
    )
}

export default Comments