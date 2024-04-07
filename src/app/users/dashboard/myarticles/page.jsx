// components
import {
    MyDashboardArticlesScreen,
} from "@/screens"

export async function generateMetadata({ params, searchParams }, parent) {
  try {
      // fetch data
      const { user } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/identity`).then((res) => res.json())
  
      // optionally access and extend (rather than replace) parent metadata
      const previousImages = (await parent).openGraph?.images || []
  
      return {
          title: `Welcome ${user.fullName} - dashboard`,
          openGraph: {
              images: [user.profilePic, ...previousImages],
          },
      }
  } catch (error) {
      return {
          title: `Admin dashboard`,
      }
  }
}
  

const MyDashboardArticles= () => {
    return (
        <>
            <MyDashboardArticlesScreen />
        </>
    )
}

export default MyDashboardArticles