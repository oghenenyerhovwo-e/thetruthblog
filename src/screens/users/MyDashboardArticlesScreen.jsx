"use client"
import { useState } from 'react'
import { useSearchParams } from "next/navigation"

// components
import { DashboardArticles, LoadingBox, MessageBox, AuthorOnly, DashboardArticleSearch } from "@/components"
import Image from 'next/image'
import Link from 'next/link'

// functions and objects
import { useGetArticlesByAuthorQuery, useAppSelector } from "@/redux"

// css
import styles from "@/styles/dashboard.module.css"

const MyDashboardArticlesScreen = ({params}) => {
    const searchParams = useSearchParams()
    const authorId = searchParams.get("authorId")
    const pageNumber = searchParams.get("pageNumber")

    const { currentUser } = useAppSelector(state => state.userStore)

    const [pageIndex, setPageIndex] = useState(pageNumber || 1)
    const [deletedArticle, setDeletedArticle] = useState("")
    const { isSuccess, isError, data } = useGetArticlesByAuthorQuery({pageIndex, authorId: authorId, deletedArticle});

    return (
        <>
            <div className="content-grid">  
                <LoadingBox display={!isSuccess && !isError} />
                {isError && <MessageBox message="Oops! something went wrong with the server" />}
                {
                    data && data.articles && (
                        <AuthorOnly author={data.articles[0] && data.articles[0].author && data.articles[0].author._id}>
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
                                    <DashboardArticleSearch />
                                </div>
                                <div className={`spacing-md`}>
                                    <DashboardArticles 
                                        articles={data && data.articles}
                                        pageIndex={pageIndex}
                                        setPageIndex={setPageIndex}
                                        pageCount={data && data.pageCount}
                                        currentUser={currentUser}
                                        setDeletedArticle={setDeletedArticle}
                                    />
                                </div>
                                <div className="back_to_dashboard">
                                    <Link href="/users/dashboard">Back</Link>
                                </div>
                            </div>
                        </AuthorOnly>
                    )
                }
            </div>
        </>
    )
}

export default MyDashboardArticlesScreen