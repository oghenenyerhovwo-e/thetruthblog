"use client"
import { useState } from "react"
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
    useUpdateUserProfileMutation,
    useGetUserProfileQuery,
    useAppDispatch,
} from "@/redux"

// styles
import styles from "@/styles/formscreen.module.css"

const EditProfileScreen = ({params}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { data, isSuccess: isGetProfileSuccess, isError: isGetProfileError } = useGetUserProfileQuery({id: params.id})
    const [updateUserProfile, { isLoading, error, isError }] = useUpdateUserProfileMutation() 
    const profile = data.user

    const initialFormState = {
        fullName: profile.fullName || "",
        email: profile.email || "",
        profilePic: profile.profilePic || "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
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
        if(form.newPassword &&  form.newPassword !== form.confirmNewPassword){
            return setFormError("new password does not match")
        }
        updateUserProfile({body: form, id: params.id})
            .unwrap()
            .then((res) => {
                setForm(initialFormState)
                router.push("/users/dashboard")
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <LoadingBox display={!isGetProfileSuccess && !isGetProfileError} />
            {!profile && <MessageBox message="No User was found" />}
            {isGetProfileError && <MessageBox message="Oops! something went wrong with the server" />}
            {
                profile && profile._id && (
                    <AuthorOnly author={profile._id}>
                        <div className="content-grid">
                            <div className={`${styles.form_screen}`}>
                                <h2 className="spacing-sm">EDIT YOUR PROFILE</h2>
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
                                        required={true}
                                        type="email"
                                        onChange={handleFormChange}
                                        placeholder="enter email"
                                        name="email"
                                    />

                                    <Form.File
                                        types={["JPG", "PNG"]}
                                        placeholder="change profile picture"
                                        name="profilePic"
                                        maxSize={5}
                                        form={form}
                                        setForm={setForm}
                                        setError={setFormError}
                                    />

                                    <Form.Input
                                        value={form.oldPassword}
                                        type="password"
                                        onChange={handleFormChange}
                                        placeholder="enter old password (must enter to perform update)"
                                        required={true}
                                        name="oldPassword"
                                    /> 

                                    <Form.Input
                                        value={form.newPassword}
                                        type="password"
                                        onChange={handleFormChange}
                                        placeholder="enter new password (if you want to change password)"
                                        name="newPassword"
                                    /> 

                                    <Form.Input
                                        value={form.confirmNewPassword}
                                        type="password"
                                        onChange={handleFormChange}
                                        placeholder="confirm new Password (if you want to change password)"
                                        name="confirmNewPassword"
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
                                            <button type="submit">Edit Profile</button>
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

export default EditProfileScreen