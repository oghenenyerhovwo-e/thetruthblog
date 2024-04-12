// components
import {
    ArticleSlugScreen,
} from "@/screens"

export async function generateMetadata({ params }, parent) {
    try {
        // fetch data
        const { article } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${params.slug}`).then((res) => res.json())
    
        // optionally access and extend (rather than replace) parent metadata
        const previousImages = (await parent).openGraph?.images || []
    
        return {
            title: `${article.title}`,
            openGraph: {
                images: [article.image, ...previousImages],
            },
        }
    } catch (error) {
        return {
            title: `${params.slug}`,
        }
    }
}
  

const ArticleSlug = ({ params }) => {
    return (
        <>
            <ArticleSlugScreen params={params} />
        </>
    )
}

export default ArticleSlug