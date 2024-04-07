import { ArticlesCategoryScreen } from "@/screens"

export async function generateMetadata({ params, searchParams }, parent) {
  const category = searchParams.get("category")

  return {
    title: `${category} articles`,
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