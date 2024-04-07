import { NewArticleScreen } from "@/screens"

export const metadata = {
    title: 'Create New Article',
    description: "Unveiling the truth behind Nigeria's stories. The Truth Blog delivers in-depth, unbiased reporting on current events, politics, social issues, and more. Get the facts you need to stay informed about Nigeria.",
}

const NewArticle = ({params}) => {

    return (
        <>
            <NewArticleScreen params={params} />
        </>
    )
}

export default NewArticle