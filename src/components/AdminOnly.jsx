"use client"
import { useRouter } from "next/navigation"
import { useEffect } from 'react'
import { 
    useAppSelector,
} from "@/redux"

const AdminOnly = (props) => {
    const router = useRouter()
    const { currentUser, isIdentityLoadComplete } = useAppSelector(state => state.userStore)

    useEffect(() => {
        if(isIdentityLoadComplete){
            if(!currentUser._id || !currentUser.isAdmin){
                router.push("/users/login")
            }
        }
    }, [currentUser, isIdentityLoadComplete, router])

    return (
        <>
            {
                currentUser._id && currentUser.isAdmin && (
                    <>{props.children} </>
                ) 
            }
        </>
    )
}

export default AdminOnly