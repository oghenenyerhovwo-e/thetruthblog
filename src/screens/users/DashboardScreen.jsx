"use client"
import { useRouter } from "next/navigation"

// components
import Link from 'next/link'
import Image from 'next/image'
import { FaUserPlus } from "react-icons/fa6";
import { FaEdit, FaUser, FaUsers } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { GrPowerShutdown } from "react-icons/gr";
import {
    UserOnly,
} from "@/components"

// functions and objects
import { 
    useAppDispatch,
    useAppSelector,
    useLogoutMutation,
    setCurrentUser,
} from "@/redux"

// css
import styles from "@/styles/dashboard.module.css"

const DashboardScreen = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { currentUser } = useAppSelector(state => state.userStore)

    const [ logout ] = useLogoutMutation() 

    const authorId = currentUser._id

    const handleLogout = () => {
        logout()
            .unwrap()
            .then(() => {
                dispatch(setCurrentUser({}))
                router.push("/users/login")
            })
            .catch(error => console.log(error))
    }

    return (
        <UserOnly>
            <div className="content-grid">
                <div className={`${styles.dashboard_main}`}>
                    <div className={`${styles.dashboard_author} spacing-md`}>
                        <h4>{currentUser.fullName} </h4>
                        <Image
                            src={currentUser.profilePic}
                            alt={`profile picture of ${currentUser.fullName}`}
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className={`${styles.dashboard_links_wrapper}`}>
                        <div className={`${styles.dashboard_links}`}>
                            <Link href="/articles/new">
                                <FaEdit />
                                <span>Add New Articles</span>
                            </Link>
                            {
                                currentUser.isAdmin && 
                                    <Link href="/users/signup">
                                        <FaUserPlus />
                                        <span>Add New User</span>
                                    </Link>
                            }
                            <Link href={{pathname: `/users/dashboard/myarticles/`, query: {authorId: authorId}}}>
                                <MdArticle />
                                <span>My Articles</span>
                            </Link>
                            {
                                currentUser.isAdmin && 
                                    <Link href="/users/dashboard/allarticles">
                                        <MdArticle />
                                        <span>View All Articles</span>
                                    </Link>
                            }
                            <Link href={`/users/${currentUser._id}/edit`}>
                                <FaUser />
                                <span>Edit Profile</span>
                            </Link>
                            {
                                currentUser.isAdmin && 
                                    <Link href="/users/">
                                        <FaUsers />
                                        <span>See All Users</span>
                                    </Link>
                            }
                            <Link href={`#`} onClick={handleLogout} >
                                <GrPowerShutdown />
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </UserOnly>
    )
}

export default DashboardScreen