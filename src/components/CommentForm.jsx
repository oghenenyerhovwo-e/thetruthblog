"use client"
import { useState } from "react"

// components
import Spinner from "./Spinner"
import Form from "./Form"
import Alert from "./Alert"

// functions and objects
import { 
    usePostCommentMutation,
} from "@/redux"

// css
import styles from "@/styles/commentform.module.css"

const CommentForm = (props) => {
    const { 
        articleId,
        setCommentSectionContent,
        setNewComment,
    } = props
    const initialCommentForm = {
        fullName: "",
        email: "",
        text: "",
    }
    const [postComment, { isLoading, isError, error }] = usePostCommentMutation()

    const [commentForm, setCommentForm] = useState(initialCommentForm)

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
        postComment({body: commentForm, articleId: articleId})
            .unwrap()
            .then(() => {
                setCommentForm(initialCommentForm)
                setNewComment(body)
                setCommentSectionContent("comments")
            })
            .catch(error => console.log(error))
    }


    return (
        <div className={`${styles.comment_form}`}>
            <form onSubmit={submitComment}>
                <Form.Input 
                    placeholder="enter full name"
                    type="text"
                    name="fullName"
                    value={commentForm.fullName}
                    onChange={handleCommentFormChange}
                />
                <Form.Input 
                    placeholder="email"
                    type="email"
                    name="email"
                    value={commentForm.email}
                    onChange={handleCommentFormChange}
                />
                <Form.Textarea 
                    placeholder="What are your thoughts?"
                    name="text"
                    value={commentForm.text}
                    onChange={handleCommentFormChange}
                    required={true}
                />
                {
                    isError && error && error.data && error.data.error &&  (
                        <div className={`spacing-sm`}>
                            <Alert 
                                message={error && error.data && error.data.error} 
                                variant="danger" 
                            />
                        </div>
                    )
                }
                {
                    !isLoading ? (
                        <button type="submit">Post comment</button>
                    ) : (
                        <div className={`${styles.comment_form_spinner}`}>
                            <Spinner />
                        </div>
                    )
                }
            </form>
        </div>
    )
}

export default CommentForm