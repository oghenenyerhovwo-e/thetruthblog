"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

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

import {
    markdownToHTML,
    htmlToMarkdown,
} from "@/helpers"

// styles
import styles from "@/styles/formscreen.module.css"

const categoryList = [
    { label: 'Politics', value: 'Politics' },
    { label: 'Sport', value: 'Sport' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Environment', value: 'Environment' },
    { label: 'Development', value: 'Development' },
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
    const [content, setContent] = useState("");

    useEffect(() => {
      const covertHTMLToMarkdown = async () => {
        const htmlContent = article && await htmlToMarkdown(article.content)
        console.log("parse(htmlContent)")
        console.log(parse(htmlContent))
        setContent(parse(htmlContent))
      }
      article && covertHTMLToMarkdown()
    }, [article])
    
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
            content: content ? await markdownToHTML(content): article.content,
            category: form.category.length > 0? form.category.map(category => category.value): article ? article.category : []
        }
        updateArticle({body, slug: params.slug})
            .unwrap()
            .then((res) => {
                router.push(`/articles/${res.articleSlug}`)
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
                                        label="Title"
                                    />

                                    <Form.Input
                                        value={form.headline || article.headline}
                                        type="text"
                                        onChange={handleFormChange}
                                        placeholder="enter headline"
                                        name="headline"
                                        label="Headline"
                                    />

                                    <Form.MarkdownInput
                                        content={content}
                                        setContent={setContent}
                                        label="Content"
                                        defaultValue={content}
                                    />

                                    <Form.MultiSelect
                                        name="category"
                                        form={form.category}
                                        defaultValue={(article && article.category && article.category.length > 0) ? article.category.map(category => {
                                            return {label: category, value: category}
                                        }): []}
                                        setForm={setForm}
                                        required={true}
                                        label="Category"
                                        options={categoryList}
                                    />

                                    <Form.File
                                        types={["JPG", "PNG"]}
                                        placeholder="Select an image or drag and drop"
                                        name="image"
                                        maxSize={10}
                                        form={form.image ? form: {...form, image: article.image}}
                                        setForm={setForm}
                                        setError={setFormError}
                                        label="Image"
                                    />

                                    <Form.Input
                                        value={form.source || article.source}
                                        type="text"
                                        onChange={handleFormChange}
                                        placeholder="enter source"
                                        name="source"
                                        label="Source"
                                    /> 

                                    <Form.Input
                                        value={form.tags || article.tags}
                                        type="text"
                                        onChange={handleFormChange}
                                        placeholder="enter tags e.g #sport, #politics"
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