"use client"

// component
import Image from 'next/image'

// styles
import styles from "@/styles/authorpicture.module.css"

const AuthorPicture = (props) => {
    const { author } = props
    return (
        <>
            {
                author && (
                    <div className={`${styles.author_picture}`}>
                        <Image
                            src={author.profilePic}
                            alt={`profile picture of ${author.fullName}`}
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