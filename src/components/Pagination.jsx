import { useRouter } from 'next/navigation'

// component
import { GrFormPrevious, GrFormNext } from "react-icons/gr"

// css
import styles from "@/styles/pagination.module.css"

const Pagination = props => {
    const {
        pageCount,
        pageIndex,
        setPageIndex,
        controlPathname,
        disablePaginationQuery,
    } = props

    const router = useRouter()

    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }

    const nextPage = () => {
        setPageIndex(prevPageIndex => prevPageIndex + 1)
        !disablePaginationQuery && router.push(`${controlPathname}pageNumber=${pageIndex + 1}`)
    }
    const previousPage = () => {
        setPageIndex(prevPageIndex => prevPageIndex - 1)
        !disablePaginationQuery && router.push(`${controlPathname}pageNumber=${pageIndex - 1}`)
    }


    return (
        <div className={`${styles.pagination_container}`}>
            {
                pageIndex > 1 && (
                    <button 
                        className={`${styles.active} ${styles.page_item}`}
                        onClick={previousPage}
                    >
                        <GrFormPrevious />
                        <span>Previous</span>
                    </button>
                )
            }
            {pageNumbers.map(number => {
                const handlePageClick = () => {
                    setPageIndex(number);
                    !disablePaginationQuery && router.push(`${controlPathname}pageNumber=${number}`)
                };

                return (
                    <button
                        key={number}
                        onClick={handlePageClick}
                        disabled={pageIndex === number}
                        className={`${styles.page_item} ${pageIndex === number && styles.disabled}`}
                    >
                        {number}
                    </button>
                )
            })}
            {
                    pageCount > pageIndex && (
                        <button 
                            onClick={nextPage}
                            className={`${styles.active} ${styles.page_item}`}
                        >
                            <span>Next</span>
                            <GrFormNext />
                        </button>
                    )
                }
        </div>
    )
}

export default Pagination