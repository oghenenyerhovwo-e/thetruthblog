// components ShowArticles
import { ShowArticles } from "@/components"


// iamege
import { logoImg } from "@/assets"

export async function generateMetadata({ params, searchParams }, parent){
    try {
      const { data } = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?filters[slug]=${params.slug}&populate=*`)
      const article = data && data.data && data.data[0] && data.data[0].attributes
      const articleImage = article && article.image && article.image.data && article.image.data.attributes && article.image.data.attributes.url
      const previousImages = (await parent).opnegRaph?.images || []
      return {
        title: article && `${article.title}`,
        description: article && `${article.headline}`,
        openGraph: {
          images: [articleImage, ...previousImages],
        }
      }
    } catch (error) {
      console.log(error)
      return {
        title: "welcome to the truth",
        openGraph: {
          images: [logoImg]
        }
      }
    }
}  

const ArticlePage = ({params}) => {

    return (
        <>
            <ShowArticles params={params} />
        </>
    )
}

export default ArticlePage
