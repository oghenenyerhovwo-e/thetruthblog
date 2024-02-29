import styles from "@/styles/commentcard.module.css"

const CommentCard = (props) => {
    const { comment } = props
    return (
        <div className={`${styles.comment_card}`}>{comment.text} </div>
    )
}

export default CommentCard