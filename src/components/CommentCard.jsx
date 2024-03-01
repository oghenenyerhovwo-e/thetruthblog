import Image from "next/image"
import { userImg } from "@/assets"
import { getTimeAgo } from "@/helpers"
import styles from "@/styles/commentcard.module.css"

const CommentCard = (props) => {
    const { comment } = props

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
                    <h4>{comment.username} </h4>
                </div>
                <h6>{getTimeAgo(comment.createdAt)} </h6>
            </div>
            <p>{comment.text} </p> 
        </div>
    )
}

export default CommentCard