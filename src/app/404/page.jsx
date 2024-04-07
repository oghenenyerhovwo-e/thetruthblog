"use client"
import { useRouter } from "next/navigation"
import { useEffect } from 'react'

const Page404 = (props) => {
    const router = useRouter()

    useEffect(() => {
        router.push("/")
    }, [router])

    return (
        <></>
    )
}

export default Page404