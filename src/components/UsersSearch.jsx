"use client"
import { useState } from 'react'

// components
import Form from "./Form"
import Popup from "./Popup"
import Spinner from "./Spinner"
import DashboardUsers from "./DashboardUsers"
import { FaSearch } from "react-icons/fa";

// functions and object
import { 
  useSearchUsersQuery,
  useAppSelector,
} from "@/redux"

// css
import styles from "@/styles/search.module.css"

const UsersSearch = () => {
    const { currentUser } = useAppSelector(state => state.userStore)

    const [searchText, setSearchText] = useState("")
    const [pageIndex, setPageIndex] = useState(1)
    const [displayPopUp, setDisplayPopUp] = useState(false)

    const { isLoading, data } = useSearchUsersQuery({pageIndex, searchText});

    const SearchResultComponent = <DashboardUsers 
            users={data.users}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageCount={data && data.pageCount}
            currentUser={currentUser}
            disablePaginationQuery={true}
        />

    const handleSearchChange = e => setSearchText(e.target.value)

    const showSearchComp = () => !isLoading && setDisplayPopUp(true)

    return (
      <div className={`${styles.search}`}>
        <div className={`${styles.search_input}`}>
          <input
              value={searchText}
              type="text"
              onChange={handleSearchChange}
              placeholder="search"
              required={true}
          />
          <button onClick={showSearchComp}>{!isLoading ? <FaSearch />: <Spinner /> }</button>
        </div>
        <Popup display={displayPopUp} setDisplay={setDisplayPopUp} >
          {
            data && data.users && data.users.length > 0 ? (
              <SearchResultComponent />
            ): (
              <div className={`${styles.search_no_data}`}>
                <h4>
                  <FaSearch /> {" "}
                  No result found for this search:
                </h4>
                <p>{form.text} </p>
              </div>
            )
          }
        </Popup>
      </div>
    )
}

export default UsersSearch
