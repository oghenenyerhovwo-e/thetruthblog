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
    useAppDispatch,
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

const EditArticleScreen = ({params}) => {
    const router = useRouter()

    const { data, isSuccess: isGetArticleSuccess, isError: isGetArticleError } = useGetArticleBySlugQuery({slug: params.slug})
    const [updateArticle, { isLoading, error, isError }] = useUpdateArticleMutation() 
    const article = data && data.article

    const initialFormState = {
        title: article.title || "", 
        headline: article.headline ||"",
        category: article.category || null,
        content: article.content || "",
        image: article.image || "",
        source: article.source || "",
        tags: article.tags ||"",
    }
    const [form, setForm] = useState(initialFormState)
    const [formError, setFormError] = useState("")

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
        updateArticle({body: form, slug: params.slug})
            .unwrap()
            .then((res) => {
                setForm(initialFormState)
                router.push(`/articles/${res.article.slug}`)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <LoadingBox display={!isGetArticleSuccess && !isGetArticleError} />
            {!article && <MessageBox message="No Article was found" />}
            {isGetArticleError && <MessageBox message="Oops! something went wrong with the server" />}
            {
                article && (
                    <AuthorOnly author={article.author && article.author._id}>
                        <div className="content-grid">
                            <div className={`${styles.form_screen}`}>
                                <h2 className="spacing-sm">EDIT ARTICLE</h2>
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
                                        label="title"
                                    />

                                    <Form.Input
                                        value={form.headline}
                                        type="text"
                                        onChange={handleFormChange}
                                        placeholder="enter headline"
                                        required={true}
                                        name="headline"
                                        label="headline"
                                    />

                                    <Form.MultiSelect
                                        name="category"
                                        form={form}
                                        setForm={setForm}
                                        required={true}
                                        label="Category"
                                        options={categoryList}
                                    />

                                    <Form.MarkdownInput
                                        name="content"
                                        form={form}
                                        setForm={setForm}
                                        required={true}
                                        label="Content"
                                    />

                                    <Form.File
                                        types={["JPG", "PNG"]}
                                        placeholder="Select an image"
                                        name="image"
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
                                    /> 

                                    <Form.Input
                                        value={form.tags}
                                        type="text"
                                        onChange={handleFormChange}
                                        placeholder="enter tags"
                                        required={true}
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