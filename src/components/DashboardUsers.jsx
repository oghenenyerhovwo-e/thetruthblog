import { Fragment } from "react"

import { usePathname } from 'next/navigation'

import DashboardUserCard from "./DashboardUserCard"
import MessageBox from "./MessageBox"
import Pagination from "./Pagination"

const DashboardUsers = (props) => {  
    const {
        users,
        setPageIndex,
        pageIndex,
        pageCount,
        currentUser,
        setUserRoleChange,
        disablePaginationQuery,
    } = props

    const pathname = usePathname()

    const controlPathname = pathname.includes("?") ? `${pathname}&` : `${pathname}?`

    return (
        <div>
            {users && users.length < 1 && <MessageBox message="No user was found" />}
            <div className={`spacing-md`}>
                {
                    users && users.length > 0 && users.map(user => {
                        return (
                            <Fragment key={user._id}>
                                <DashboardUserCard user={user} setUserRoleChange={setUserRoleChange} currentUser={currentUser} />
                            </Fragment>
                        )
                    })
                }
            </div>
            <div className={`${styles.users_page_pagination} spacing-md`}>
                {
                    pageCount && (
                        <Pagination
                            pageCount={pageCount}
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            currentUser={currentUser}
                            controlPathname={controlPathname}
                            disablePaginationQuery={disablePaginationQuery}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default DashboardUsers