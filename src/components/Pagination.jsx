import { useRouter } from 'next/navigation'

import { GrFormPrevious, GrFormNext } from "react-icons/gr"

import styles from "@/styles/pagination.module.css"

const Pagination = props => {
    const {
        pagination,
        pageIndex,
        setPageIndex,
        controlPathname,
    } = props

    const router = useRouter()

    const pageCount = pagination.pageCount

    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }

    const nextPage = () => {
        setPageIndex(prevPageIndex => prevPageIndex + 1)
        router.push(`${controlPathname}pageNumber=${pageIndex + 1}`)
    }
    const previousPage = () => {
        setPageIndex(prevPageIndex => prevPageIndex - 1)
        router.push(`${controlPathname}pageNumber=${pageIndex - 1}`)
    }


    return (
        <div className={`${styles.pagination_container}`}>
            {
                pagination.page > 1 && (
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
                    router.push(`${controlPathname}pageNumber=${number}`)
                };

                return (
                    <button
                        key={number}
                        onClick={handlePageClick}
                        disabled={pagination.page === number}
                        className={`${styles.page_item} ${pagination.page === number && styles.disabled}`}
                    >
                        {number}
                    </button>
                )
            })}
            {
                    pagination.pageCount > pagination.page && (
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