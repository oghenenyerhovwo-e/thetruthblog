"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'

// components
import {
    Form,
    Spinner,
    Alert,
    AuthorOnly,
    LoadingBox,
    MessageBox,
} from "@/components"

// functions and objects
import { 
    useUpdateArticleMutation,
    useGetArticleBySlugQuery,
} from "@/redux"

// styles
import styles from "@/styles/formscreen.module.css"

const categoryList = [
    { label: 'Home', value: 'Home' },
    { label: 'Politics', value: 'Politics' },
    { label: 'Sport', value: 'Sport' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Business', value: 'Business' },
    { label: 'News', value: 'News' },
    { label: 'Technology', value: 'Technology' },
    { label: 'International', value: 'International' },
    { label: 'Features', value: 'Features' },
    { label: 'Blogs Feed', value: 'Blogs Feed' }
  ];  

const EditArticleScreen = (props) => {
    const { params } = props
    const router = useRouter()

    const { data, isSuccess: isGetArticleSuccess, isError: isGetArticleError } = useGetArticleBySlugQuery({slug: params.slug})
    const [updateArticle, { isLoading, error, isError }] = useUpdateArticleMutation() 
    const article = data && data.article

    const initialFormState = {
        title: (article && article.title) || "", 
        headline: (article && article.headline) ||"",
        category: (article && article.category && article.category.length > 0) ? article.category.map(category => {
            return {label: category, value: category}
        }): [],
        content: (article && article.content) || "",
        image: (article && article.image) || "",
        source: (article && article.source) || "",
        tags: (article && article.tags) ||"",
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

    const submitComment = e => {
        e.preventDefault()
        setFormError("")
        const body = {
            ...form,
            content,
            category: form.category.length > 0? form.category.map(category => category.value): []
        }
        updateArticle({body, slug: params.slug})
            .unwrap()
            .then((res) => {
                setForm(initialFormState)
                setContent(`***Enter content here**`)
                router.push(`/articles/${res.article.slug}`)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <LoadingBox display={!isGetArticleSuccess && !isGetArticleError} />
            {isGetArticleSuccess && !article && <MessageBox message="No Article was found" />}
            {isGetArticleError && <MessageBox message="Oops! something went wrong with the server" />}
            {
                article && article._id && (
                    <AuthorOnly author={article.author && article.author._id}>
                        <div className="content-grid">
                            <div className={`${styles.form_screen}`}>
                                <h2 className="spacing-sm">EDIT ARTICLE</h2>
                                <form 
                                    onSubmit={submitComment} 
                                    className={`spacing-sm`}
                                >
                                    <Form.Input
                                        value={form.title || article.title}
                                        type="text"
                                        onChange={handleFormChange}
                                        placeholder="enter title"
                                        name="title"
                                        label="title"
                                    />

                                    <Form.Input
                                        value={form.headline || article.headline}
                                        type="text"
                                        onChange={handleFormChange}
                                        placeholder="enter headline"
                                        name="headline"
                                        label="headline"
                                    />

                                    <Form.MultiSelect
                                        name="category"
                                        form={form.category ? form: {...form, category: article.category}}
                                        setForm={setForm}
                                        required={true}
                                        label="Category"
                                        options={categoryList}
                                    />

                                    <Form.MarkdownInput
                                        content={content || article.content}
                                        setContent={setContent}
                                        label="Content"
                                    />

                                    <Form.File
                                        types={["JPG", "PNG"]}
                                        placeholder="Select an image or drag and drop"
                                        name="image"
                                        maxSize={10}
                                        form={form.image ? form: {...form, image: article.image}}
                                        setForm={setForm}
                                        setError={setFormError}
                                    />

                                    <Form.Input
                                        value={form.source || article.source}
                                        type="text"
                                        onChange={handleFormChange}
                                        placeholder="enter source"
                                        name="source"
                                    /> 

                                    <Form.Input
                                        value={form.tags || article.tags}
                                        type="text"
                                        onChange={handleFormChange}
                                        placeholder="enter tags"
                                        name="tags"
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
                                            <button type="submit">Edit</button>
                                        ) : (
                                            <div className={`${styles.form_screen_spinner}`}>
                                                <Spinner />
                                            </div>
                                        )
                                    }
                                </form>
                            </div>
                        </div>
                    </AuthorOnly>
                )
            }
        </>
    )
}

export default EditArticleScreen