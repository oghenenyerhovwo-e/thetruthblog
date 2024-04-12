"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

// components
import {
    Form,
    Spinner,
    Alert,
    NonUserOnly,
} from "@/components"

// functions and objects
import { useLoginMutation, useAppDispatch, setCurrentUser } from "@/redux"

// styles
import styles from "@/styles/formscreen.module.css"

const LoginScreen = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [login, { isLoading, error, isError }] = useLoginMutation() 

    const initialFormState = {
        email: "",
        password: "",
    }
    const [form, setForm] = useState(initialFormState)

    const handleFormChange = e => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value,
        })
    }

    const submitComment = e => {
        e.preventDefault()
        login({body: form})
            .unwrap()
            .then((res) => {
                dispatch(setCurrentUser(res.user))
                setForm(initialFormState)
                router.push("/users/dashboard")
            })
            .catch(error => console.log(error))
    }

    return (
        <NonUserOnly>
            <div className="content-grid">
                <div className={`${styles.form_screen}`}>
                    <h2 className="spacing-sm">LOG INTO EXISTING ACCOUNT</h2>
                    <form onSubmit={submitComment} className={`spacing-sm ${styles.form}`}>
                        <Form.Input
                            value={form.email}
                            type="email"
                            onChange={handleFormChange}
                            placeholder="enter email"
                            name="email"
                            required={true}
                        />

                        <Form.Input
                            value={form.password}
                            type="password"
                            onChange={handleFormChange}
                            placeholder="enter password"
                            required={true}
                            name="password"
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
                                <button type="submit">Login</button>
                            ) : (
                                <div className={`${styles.form_screen_spinner}`}>
                                    <Spinner />
                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </NonUserOnly>
    )
}

export default LoginScreen