"use client"
import { useState } from 'react'

// components
import Popup from "./Popup"
import Spinner from "./Spinner"
import DashboardArticles from "./DashboardArticles"
import { FaSearch } from "react-icons/fa";

// functions and object
import { 
  useSearchArticlesQuery,
  useAppSelector,
} from "@/redux"

// css
import styles from "@/styles/search.module.css"

const DashboardArticleSearch = () => {
    const { currentUser } = useAppSelector(state => state.userStore)

    const [searchText, setSearchText] = useState("")
    const [pageIndex, setPageIndex] = useState(1)
    const [displayPopUp, setDisplayPopUp] = useState(false)

    const { isLoading, isSuccess, isError, data } = useSearchArticlesQuery({pageIndex, searchText});

    const handleSearchChange = e => setSearchText(e.target.value)

    const showSearchComp = () => searchText && setDisplayPopUp(true)

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
          <button disabled={!searchText} onClick={showSearchComp}><FaSearch /></button>
        </div>
        <Popup display={displayPopUp} setDisplay={setDisplayPopUp} >
          {
            data && data.articles && data.articles.length > 0 ? (
              <DashboardArticles 
                    articles={data && data.articles}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pageCount={data && data.pageCount}
                    currentUser={currentUser}
                    disablePaginationQuery={true}
                />
            ): isSuccess && !data ? (
              <div className={`${styles.search_no_data}`}>
                <h4>
                  <FaSearch /> {" "}
                  No result found for this search:
                </h4>
                <p>{searchText} </p>
              </div>
            ): isError ? (
              <div className={`${styles.search_no_data}`}>
                <h4>
                  <FaSearch /> {" "}
                  Something went wrong with the server
                </h4>
              </div>
            ) : (
              <div className={`${styles.search_no_data}`}>
                <h4>
                  <FaSearch /> {" "}
                  {isLoading && <Spinner />}{" "}
                  Loading...
                </h4>
              </div>
            )
          }
        </Popup>
      </div>
    )
}

export default DashboardArticleSearch
