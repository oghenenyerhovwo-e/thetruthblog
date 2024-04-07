import { ArticlesAuthorScreen } from "@/screens"

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.author} articles`,
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