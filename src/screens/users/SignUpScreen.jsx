"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'

// components
import {
    Form,
    Spinner,
    Alert,
    AdminOnly,
} from "@/components"

// functions and objects
import { 
    useSignupMutation,
    useAppDispatch,
} from "@/redux"

// styles
import styles from "@/styles/formscreen.module.css"

const SignUpScreen = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [signup, { isLoading, error, isError }] = useSignupMutation() 

    const initialFormState = {
        fullName: "",
        email: "",
        password: "",
        profilePic: "",
        confirmPassword: "",
        adminPassword: "",
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
        if(form.password !== form.confirmPassword){
            return setFormError("password do not match")
        }
        signup({body: form})
            .unwrap()
            .then((res) => {
                setForm(initialFormState)
                router.push("/users/login")
            })
            .catch(error => console.log(error))
    }

    return (
        <AdminOnly>
            <div className="content-grid">
                <div className={`${styles.form_screen}`}>
                    <h2 className="spacing-sm">REGISTER NEW ACCOUNT</h2>
                    <form 
                        onSubmit={submitComment} 
                        className={`spacing-sm`}
                    >
                        <Form.Input
                            value={form.fullName}
                            type="text"
                            onChange={handleFormChange}
                            placeholder="enter full name"
                            required={true}
                            name="fullName"
                        />

                        <Form.Input
                            value={form.email}
                            type="email"
                            onChange={handleFormChange}
                            placeholder="enter email"
                            required={true}
                            name="email"
                        />

                        <Form.File
                            types={["JPG", "PNG"]}
                            placeholder="Select profile picture or drag and drop"
                            name="profilePic"
                            required={true}
                            maxSize={5}
                            form={form}
                            setForm={setForm}
                            setError={setFormError}
                        />

                        <Form.Input
                            value={form.password}
                            type="password"
                            onChange={handleFormChange}
                            placeholder="enter password"
                            required={true}
                            name="password"
                        /> 

                        <Form.Input
                            value={form.confirmPassword}
                            type="password"
                            onChange={handleFormChange}
                            placeholder="confirm Password"
                            required={true}
                            name="confirmPassword"
                        />

                        <Form.Input
                            value={form.adminPassword}
                            type="password"
                            onChange={handleFormChange}
                            placeholder="Enter your admin password"
                            required={true}
                            name="adminPassword"
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
                                <button type="submit">Register</button>
                            ) : (
                                <div className={`${styles.form_screen_spinner}`}>
                                    <Spinner />
                                </div>
                            )
                        }
                    </form>
                    {/* <div className={`${styles.form_links}`}>
                        <Link href="/users/signup">Sign up</Link>
                        <div></div>
                        <Link href="/users/login">Login</Link>
                    </div> */}
                    <div className="back_to_dashboard">
                        <Link href="/users/dashboard">Back</Link>
                    </div>
                </div>
            </div>
        </AdminOnly>
    )
}

export default SignUpScreen