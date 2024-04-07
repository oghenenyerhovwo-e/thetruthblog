"use client"
import { useState } from 'react'
import { useSearchParams } from "next/navigation"

// components
import { 
    DashboardArticles, 
    LoadingBox, 
    MessageBox, 
    AdminOnly,
    ArticlesSearch,
} from "@/components"
import Image from 'next/image'
import Link from 'next/link'

// functions and objects
import { useGetArticlesQuery, useAppSelector } from "@/redux"

// css
import styles from "@/styles/dashboard.module.css"

const AllDashboardArticlesScreen = ({params}) => {
    const searchParams = useSearchParams()
    const pageNumber = searchParams.get("pageNumber")

    const { currentUser } = useAppSelector(state => state.userStore)

    const [pageIndex, setPageIndex] = useState(pageNumber || 1)
    const { isSuccess, isError, data } = useGetArticlesQuery({pageIndex});

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
                        <ArticlesSearch name="dashboardArticles" />
                    </div>
                    <div className={`spacing-md`}>
                        <DashboardArticles 
                            articles={data.articles}
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            pageCount={data && data.pageCount}
                            currentUser={currentUser}
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

export default AllDashboardArticlesScreen