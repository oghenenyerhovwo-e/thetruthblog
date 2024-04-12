"use client"
import { useState } from 'react'
import { useSearchParams } from "next/navigation"

// components
import { 
    DashboardUsers, 
    LoadingBox, 
    MessageBox, 
    AdminOnly, 
    UsersSearch,
} from "@/components"
import Link from 'next/link'
import Image from 'next/image'

// functions and objects
import { useGetUsersQuery, useAppSelector } from "@/redux"

// css
import styles from "@/styles/dashboard.module.css"


const AllUsersScreen = () => {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("pageNumber")

    const { currentUser } = useAppSelector(state => state.userStore)

    const [pageIndex, setPageIndex] = useState(pageNumber || 1)
    const [userRoleChange, setUserRoleChange] = useState({})
    const { isSuccess, isError, data } = useGetUsersQuery({pageIndex, userRoleChange});

    return (
        <AdminOnly>
            <div className="content-grid">  
                <LoadingBox display={!isSuccess && !isError} />
                {isError && <MessageBox message="Oops! something went wrong with the server" />}
                <div className={`${styles.dashboard}`}>
                    <div className={`${styles.dashboard_author} spacing-md`}>
                        <h4>{currentUser.fullName} </h4>
                        <Image
                            src={currentUser.profilePic}
                            alt={`profile picture of ${currentUser.fullName}`}
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className={`spacing-md`}>
                        <UsersSearch />
                    </div>
                    <div className={`spacing-md`}>
                        <DashboardUsers 
                            users={data && data.users}
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            pageCount={data && data.pageCount}
                            currentUser={currentUser}
                            setUserRoleChange={setUserRoleChange}
                        />
                    </div>
                    <div className="back_to_dashboard">
                        <Link href="/users/dashboard">Back</Link>
                    </div>
                </div>
            </div>
        </AdminOnly>
    )
}

export default AllUsersScreen