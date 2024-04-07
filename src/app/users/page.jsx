import { AllUsersScreen } from "@/screens"

export const metadata = {
    title: 'All users of the truth blog',
    description: "Unveiling the truth behind Nigeria's stories. The Truth Blog delivers in-depth, unbiased reporting on current events, politics, social issues, and more. Get the facts you need to stay informed about Nigeria.",
}

const AllUsers = ({params}) => {

    return (
        <>
            <AllUsersScreen params={params} />
        </>
    )
}

export default AllUsers