"use client"
import { useState } from 'react'

// components
import Form from "./Form"
import Popup from "./Popup"
import Spinner from "./Spinner"
import Articles from "./Articles"
import DashboardArticles from "./DashboardArticles"
import { FaSearch } from "react-icons/fa";

// functions and object
import { 
  useSearchArticlesQuery,
  useAppSelector,
} from "@/redux"

// css
import styles from "@/styles/search.module.css"

const ArticlesSearch = (props) => {
    const {
      name,
    } = props

    const { currentUser } = useAppSelector(state => state.userStore)

    const [searchText, setSearchText] = useState("")
    const [pageIndex, setPageIndex] = useState(1)
    const [displayPopUp, setDisplayPopUp] = useState(false)

    const { isLoading, data } = useSearchArticlesQuery({pageIndex, searchText});

    const ArticlesComponent = <Articles 
            articles={data && data.articles}
            pageCount={data && data.pageCount}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            disablePaginationQuery={true}
        />

    const DashboardArticlesComponent = <DashboardArticles 
            articles={data && data.articles}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageCount={data && data.pageCount}
            currentUser={currentUser}
            disablePaginationQuery={true}
        />

    const SearchResultObject = {
      articles: ArticlesComponent,
      dashboardArticles: DashboardArticlesComponent,
    }

    const SearchResult = SearchResultObject[name]

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
            data && data.articles && data.articles.length > 0 ? (
              <SearchResult />
            ): (
              <div className={`${styles.search_no_data}`}>
                <h4>
                  <FaSearch /> {" "}
                  No result found for this search:
                </h4>
                <p>{searchText} </p>
              </div>
            )
          }
        </Popup>
      </div>
    )
}

export default ArticlesSearch
