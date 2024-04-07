"use client"
import { useEffect } from 'react'
import { 
    useGetUserIdentityQuery,
    useAppDispatch,
    setCurrentUser, 
    setIsIdentityLoadComplete,
} from "@/redux"

import LoadingBox from "./LoadingBox"

const Effects = () => {
    const dispatch = useAppDispatch()

    const { isSuccess, isError, data } = useGetUserIdentityQuery();
    
    useEffect(() => {
        if(data){
            dispatch(setCurrentUser(data.user))
        }
    }, [dispatch, data])

    useEffect(() => {
        if(isSuccess || isError){
            dispatch(setIsIdentityLoadComplete(true))
        }
    }, [dispatch, isSuccess, isError])

    return (
        <>
            <LoadingBox display={!isSuccess && !isError} />
        </>
    )
}

export default Effects