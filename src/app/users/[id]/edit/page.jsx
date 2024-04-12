// components
import {
    EditProfileScreen,
} from "@/screens"

export async function generateMetadata({ params, searchParams }, parent) {
  try {
      // fetch data
      const { user } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/identity`).then((res) => res.json())
  
      // optionally access and extend (rather than replace) parent metadata
      const previousImages = (await parent).openGraph?.images || []
  
      return {
          title: `Edit Profile`,
          openGraph: {
              images: [user.profilePic, ...previousImages],
          },
      }
  } catch (error) {
      return {
          title: `Edit Profile`,
      }
  }
}
  

const EditProfile = ({ params }) => {
    return (
        <>
            <EditProfileScreen params={params} />
        </>
    )
}

export default EditProfile