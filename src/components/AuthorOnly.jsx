"use client"
import { useRouter } from "next/navigation"
import { useEffect } from 'react'
import { 
    useAppSelector,
} from "@/redux"

const AuthorOnly = (props) => {
    const { author } = props
    const router = useRouter()
    const { currentUser, isIdentityLoadComplete } = useAppSelector(state => state.userStore)

    useEffect(() => {
        if(isIdentityLoadComplete){
            if(String(currentUser._id) !== String(author)){
                router.push("/users/login")
            }
        }
    }, [currentUser, isIdentityLoadComplete, router, author])

    return (
        <>
            {
                String(currentUser._id) === String(author) && (
                    <>{props.children} </>
                ) 
            }
        </>
    )
}

export default AuthorOnly