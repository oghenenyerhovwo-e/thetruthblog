"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

// components
import {
    Form,
    Spinner,
    Alert,
    UserOnly,
} from "@/components"
import Link from 'next/link'

// functions and objects
import {
    usePostArticleMutation,
} from "@/redux"

import {
    markdownToHTML,
} from "@/helpers"

// styles
import styles from "@/styles/formscreen.module.css"

const categoryList = [
    { label: 'Politics', value: 'Politics' },
    { label: 'Sport', value: 'Sport' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Business', value: 'Business' },
    { label: 'Environment', value: 'Environment' },
    { label: 'Development', value: 'Development' },
    { label: 'News', value: 'News' },
    { label: 'Technology', value: 'Technology' },
    { label: 'International', value: 'International' },
    { label: 'Features', value: 'Features' },
    { label: 'Blogs Feed', value: 'Blogs Feed' }
  ];  

const NewArticleScreen = () => {
    const router = useRouter()

    const [postArticle, { isLoading, error, isError }] = usePostArticleMutation() 

    const initialFormState = {
        title: "", 
        headline: "",
        category: [],
        content: "",
        image: "",
        source: "",
        tags: "",
    }
    const [form, setForm] = useState(initialFormState)
    const [formError, setFormError] = useState("")
    const [content, setContent] = useState(`**Enter content**`);

    const handleFormChange = e => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value,
        })
    }

    const submitComment = async e => {
        e.preventDefault()

        setFormError("")
        const body = {
            ...form,
            content: content ? await markdownToHTML(content): "",
            category: form.category.length > 0? form.category.map(category => category.value): []
        }
        console.log("body")
        console.log(body)
        postArticle({body})
            .unwrap()
            .then((res) => {
                setForm(initialFormState)
                setContent(`***Enter content here**`)
                router.push(`/articles/${res.articleSlug}`)
            })
            .catch(error => console.log(error))
    }

    return (
        <UserOnly>
            <div className="content-grid">
                <div className={`${styles.form_screen}`}>
                    <h2 className="spacing-sm">CREATE NEW ARTICLE</h2>
                    <form 
                        onSubmit={submitComment} 
                        className={`spacing-sm`}
                    >
                        <Form.Input
                            value={form.title}
                            type="text"
                            onChange={handleFormChange}
                            placeholder="enter title"
                            required={true}
                            name="title"
                            label="Title"
                        />

                        <Form.Input
                            value={form.headline}
                            type="text"
                            onChange={handleFormChange}
                            placeholder="enter headline"
                            required={true}
                            name="headline"
                            label="Headline"
                        />

                        <Form.MarkdownInput
                            content={content}
                            setContent={setContent}
                            required={true}
                            label="Content"
                        />

                        <Form.MultiSelect
                            name="category"
                            form={form}
                            setForm={setForm}
                            required={true}
                            label="Category"
                            options={categoryList}
                        />

                        <Form.File
                            types={["JPG", "PNG"]}
                            placeholder="Select an image or drag and drop"
                            name="image"
                            label="Image"
                            required={true}
                            maxSize={10}
                            form={form}
                            setForm={setForm}
                            setError={setFormError}
                        />

                        <Form.Input
                            value={form.source}
                            type="text"
                            onChange={handleFormChange}
                            placeholder="enter source"
                            required={true}
                            name="source"
                            label="Source"
                        /> 

                        <Form.Input
                            value={form.tags}
                            type="text"
                            onChange={handleFormChange}
                            placeholder="enter tags"
                            required={true}
                            name="tags"
                            label="Tags"
                        />

                        {
                            ((isError && error && error.data && error.data.error) || formError) &&  (
                                <div className={`spacing-sm`}>
                                    <Alert 
                                        message={(formError || (error && error.data && error.data.error))} 
                                        variant="danger" 
                                    />
                                </div>
                            )
                        }

                        {
                            !isLoading ? (
                                <button type="submit">Create</button>
                            ) : (
                                <div className={`${styles.form_screen_spinner}`}>
                                    <Spinner />
                                </div>
                            )
                        }
                    </form>
                    <div className="back_to_dashboard">
                        <Link href="/users/dashboard">Back</Link>
                    </div>
                </div>
            </div>
        </UserOnly>
    )
}

export default NewArticleScreen