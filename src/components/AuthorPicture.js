"use client"

import Image from 'next/image'

import styles from "@/styles/authorpicture.module.css"

import { 
    useGetAuthorByIdQuery,
} from "@/redux"

const AuthorPicture = (props) => {
    const { authorId } = props
    const { data } = useGetAuthorByIdQuery(authorId)
    const author = data && data.data && data.data.attributes
    const authorImg = author && author.profilePic && author.profilePic.data && author.profilePic.data.attributes.url

    return (
        <>
            {
                author && (
                    <div className={`${styles.author_picture}`}>
                        <Image
                            src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + authorImg}
                            alt={`profile picture of ${author}`}
                            width={20}
                            height={20}
                        />
                        
                    </div>
                )
            }
        </>
    )
}

export default AuthorPicture