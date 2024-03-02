"use client"
import { useState } from "react"

import { 
    usePostCommentMutation,
} from "@/redux"

import Spinner from "./Spinner"

import styles from "@/styles/commentform.module.css"

const CommentForm = (props) => {
    const { 
        articleId,
        setCommentSectionContent,
    } = props
    const initialCommentForm = {
        username: "",
        email: "",
        text: "",
    }
    const [postComment, { isLoading }] = usePostCommentMutation()

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
        const body = {
            data: {
                ...commentForm,
                Article: articleId,
            }
        }
        postComment(body)
            .unwrap()
            .then(() => {
                setCommentForm(initialCommentForm)
                setCommentSectionContent("comments")
            })
            .catch(error => console.log(error))
    }


    return (
        <div className={`${styles.comment_form}`}>
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
                    placeholder="What are your thoughts?"
                    name="text"
                    value={commentForm.text}
                    onChange={handleCommentFormChange}
                    required={true}
                />
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