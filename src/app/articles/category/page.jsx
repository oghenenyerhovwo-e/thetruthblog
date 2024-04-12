import { ArticlesCategoryScreen } from "@/screens"

export async function generateMetadata({ params, searchParams }, parent) {
  const category = searchParams["category"] || "The Truth"

  return {
    title: `${category}`,
  }
}

const ArticlesCategory = ({params}) => {

    return (
        <>
            <ArticlesCategoryScreen params={params} />
        </>
    )
}

export default ArticlesCategory