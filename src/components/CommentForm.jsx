import styles from "@/styles/commentform.module.css"

const CommentForm = (props) => {
    const { onSubmit, onChange, commentForm } = props

    return (
        <div className={`${styles.comment_form}`}>
            <form onSubmit={onSubmit}>
                <input 
                    placeholder="username"
                    type="text"
                    name="username"
                    value={commentForm.username}
                    onChange={onChange}
                />
                <input 
                    placeholder="email"
                    type="email"
                    name="email"
                    value={commentForm.email}
                    onChange={onChange}
                />
                <textarea 
                    placeholder="What are your thoughts?"
                    name="text"
                    value={commentForm.text}
                    onChange={onChange}
                    required={true}
                />
                <button type="submit">Post comment</button>
            </form>
        </div>
    )
}

export default CommentForm