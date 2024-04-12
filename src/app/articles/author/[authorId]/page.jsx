import { ArticlesAuthorScreen } from "@/screens"

export async function generateMetadata({ params, searchParams }, parent) {
  const authorName = searchParams["authorName"] || "The Truth"
  return {
    title: `${authorName} articles`,
  }
}

const ArticlesAuthor = ({params}) => {

    return (
        <>
            <ArticlesAuthorScreen params={params} />
        </>
    )
}

export default ArticlesAuthor