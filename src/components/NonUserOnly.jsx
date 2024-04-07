"use client"
import { useRouter } from "next/navigation"
import { useEffect } from 'react'
import { 
    useAppSelector,
} from "@/redux"

const NonUserOnly = (props) => {
    const router = useRouter()
    const { currentUser, isIdentityLoadComplete } = useAppSelector(state => state.userStore)

    useEffect(() => {
        if(isIdentityLoadComplete){
            if(currentUser._id){
                router.push("/users/dashboard")
            }
        }
    }, [currentUser, isIdentityLoadComplete, router])

    return (
        <>
            {
                !currentUser._id && (
                    <>{props.children} </>
                ) 
            }
        </>
    )
}

export default NonUserOnly